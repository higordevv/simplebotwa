import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import io from "fastify-socket.io";
import { Socket } from "socket.io";
import { FgGreen, FgYellow, Reset } from "./utils/Colors";
import Bot from "./bot/Bot";

export class BotServer {
  readonly App: FastifyInstance;
  constructor() {
    this.App = fastify();
    this.middlewares();
    this.routes();
    this.socket;
  }
  private middlewares() {
    this.App.register(cors, {
      origin: "*",
    });
    this.App.register(io, {
      cors: {
        origin: "*",
      },
    });
  }

  private routes() {
    this.App.get("/", async (req, reply) => {
      reply.send("online");
    });

    this.App.ready((err) => {
      if (err) throw err;

      this.App.io.on("connection", (sock) => {
        this.socket(sock);
      });
    });
  }
  private socket(sock: Socket) {
    let bot: Bot;
    sock.on("start", async () => {
      bot = new Bot(sock);
      await bot.start();
    });

    sock.on("logout", () => {
      console.log(FgYellow, `[!] Bot logout`, Reset);
      bot.kill();
    });
  }
}

const { App } = new BotServer();

App.listen(
  {
    port: 3000,
  },
  () => {
    console.log(FgGreen + "[!] Server ON");
  }
);
