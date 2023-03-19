import fastify, { FastifyInstance } from "fastify";
import Cors from "@fastify/cors";
import fastify_io from "fastify-socket.io";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { BgCyan, FgGreen, FgYellow, Reset } from "./utils/Colors";
import Bot from "./bot/Bot";

class BotServer {
  readonly App: FastifyInstance;
  constructor() {
    this.App = fastify({ logger: true });
    this.middlewares();
    this.socket;
  }
  private middlewares() {
    this.App.register(Cors);
    this.App.register(fastify_io);
  }
  public socket(sock: Socket, io: Server) {
    let bot: Bot;
    sock.emit("start", async () => {
      bot = new Bot(io, sock);
      await bot.start();
    });

    sock.emit("logout", () => {
      console.log(FgYellow, `[!] Bot logout`, Reset);
      bot.kill();
    });
  }
}

const { socket, App } = new BotServer();

App.get("/", async (req, reply) => {
  reply.send("online");
});

const HttpServer = createServer(App.server);

const IoConfig = new Server(HttpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 1e8,
});

App.ready((err) => {
  if (err) throw err;

  return App.io.on("connection", (sock) => {
    socket(sock, IoConfig);
  });
});

App.listen({ port: 8080 }, () =>
  console.log(FgGreen + "[!] Server running!!" + Reset)
);
