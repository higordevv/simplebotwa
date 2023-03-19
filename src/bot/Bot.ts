/**
 * @author zack
 * @version 2.1
 * @copyright Erwin System
 *
 * @abstract Higor
 */

import { Server, Socket } from "socket.io";

import makeWASocket, {
  delay,
  DisconnectReason,
  MessageRetryMap,
  useMultiFileAuthState,
} from "@adiwajshing/baileys";
import { Contact, Flux, FluxMessages } from "./types";
import { Boom } from "@hapi/boom";
import { FgGreen, FgRed, FgYellow, Reset } from "../utils/Colors";
import path from "path";
import fs from "fs-extra";
import { clearVoidCache, deleteInvalidCache } from "../utils/index";

export default class Bot {
  public clientSocket: Socket;

  private io: Server;

  public status: "desconectado" | "conectado" = "desconectado";

  public socket: any;

  private messages?: Contact[] = [];

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.clientSocket = socket;
  }

  public async connection() {
    console.log(FgYellow + "Connecting...." + Reset);
    clearVoidCache();
    deleteInvalidCache();
    const { state, saveCreds } = await useMultiFileAuthState(
      path.resolve(__dirname, "..", "..", "cache")
    );
    const msgRetryCounterMap: MessageRetryMap = {};

    const sock = makeWASocket({
      auth: state,
      defaultQueryTimeoutMs: undefined,
      printQRInTerminal: true,
      msgRetryCounterMap: {},

      patchMessageBeforeSending: (message) => {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };

        return message;
      },
    });

    sock.ev.on("connection.update", async (action) => {
      const update = action;
      const { connection, lastDisconnect } = update;

      //se a conexão estiver fechada
      if (connection === "close") {
        //altera status do bot
        this.status = "desconectado";
        //verificar se é necessário reconectar
        const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        if (shouldReconnect) {
          await this.connection(); //reconecta
        }
        if (statusCode == DisconnectReason.loggedOut) {
          console.log(FgRed, "[!] phone close session", Reset);
          this.clientSocket.emit("conn", { status: "phone closed session" });
        }
      }

      if (update.qr) {
        this.clientSocket.emit("conn", {
          status: "qrcode",
          qr: update.qr,
        });
      }

      if (connection === "connecting") {
        this.clientSocket.emit("conn", { status: "loading" });
      }

      if (connection == "open") {
        this.status = "conectado";

        this.clientSocket.emit("conn", { status: "connected" });
      }
    });
    //evento de credenciais
    sock.ev.on("creds.update", async () => {
      await saveCreds();
    });

    //eventos de mensagem
    sock.ev.on("messages.upsert", async (msg) => {
      //extraindo objeto [0] das mensagens recebidas
      const [webMessage] = msg.messages;
      //extraindo propriedades da webMessage
      const { key, message, pushName } = webMessage;

      //zona de teste
      const text =
        message?.conversation ||
        message?.imageMessage?.caption ||
        message?.videoMessage?.caption ||
        message?.documentMessage?.caption ||
        message?.extendedTextMessage?.text;
      if (text == "teste") {
        if (key.remoteJid) {
          console.log(key.remoteJid, "teste foi um sucesso senhor! 🗿🍷");
        }
      }
    });

    this.socket = sock;
  }

  start = async () => {
    if (!this.socket) {
      await this.connection();
    }
  };

  kill = async () => {
    await this.socket.logout();
    this.socket = null;
    const pastaAlvo = path.resolve(__dirname, "..", "..", "cache");
    fs.removeSync(pastaAlvo);
  };
}
