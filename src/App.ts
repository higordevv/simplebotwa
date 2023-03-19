import fastify, { FastifyInstance } from "fastify";
import Cors from "@fastify/cors";

class Server {
  readonly App: FastifyInstance;
  constructor() {
    this.App = fastify();
    this.middlewares();
    this.routes();
  }
  private middlewares() {
    this.App.register(Cors);
  }
  private routes() {}
}

export default new Server().App.listen({ port: 3000 }).then(() =>
  console.log("Server ON")
);
