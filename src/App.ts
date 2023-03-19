import fastify, { FastifyInstance } from "fastify";
import Cors from "@fastify/cors";
import io from "fastify-socket.io";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { BgCyan, FgGreen, FgYellow, Reset } from "./utils/Colors";
import Bot from "./bot/Bot";

class BotServer {
  readonly App: FastifyInstance;
  constructor() {
    this.App = fastify({ logger: true });
    this.middlewares();
  }
  private middlewares() {
    this.App.register(Cors);
    this.App.register(io);
  }
  public socket(sock: Socket, io: Server) {
    let bot: Bot;

    sock.on("start", async () => {
      bot = new Bot(io, sock);
      await bot.start();
    });

    sock.on("logout", () => {
      console.log(FgYellow, `[!] Bot logout`, Reset);
      bot.kill();
    });
  }
}

const ServerInstance = new BotServer().App.server;

const HttpServer = createServer(ServerInstance);

const IoConfig = new Server(HttpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 1e8,
});

IoConfig.on("connection", (socket) => {
  new BotServer().socket(socket, IoConfig);
});

export default HttpServer.listen(3000, () => {
  console.log(BgCyan + FgGreen + "[!] Server running!!" + Reset);
});
