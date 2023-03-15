import { DisconnectReason, useMultiFileAuthState } from "@adiwajshing/baileys";
import makeWASocket from "@adiwajshing/baileys/lib/Socket";
import { Boom } from "@hapi/boom";
import pino from "pino";
import path from 'path';

export const Connect = async () => {

  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "..", "cache")
  );

  const socket = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' })
  });

  
  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    const { user } = socket
    if (connection === 'open') {
      user ? console.log(`\nLogged on ${user.name} ${user.id}`) : null
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output
        ?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        await Connect();
      }
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
};