import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";
import { Imenu } from "../interfaces/Imenu";

export const botFunctions = (
  webMessage: proto.IWebMessageInfo,
  socket: any
): Ibot => {
  const { remoteJid } = webMessage.key;

  const botInfo = socket.user;
  const isOwner = async () => {
    return false;
  };
  const sendText = async (txt: string) => {
    return socket.sendMessage(remoteJid, { text: txt });
  };
  const reply = async (txt: string) => {
    return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage });
  };

  const sendMenu = async (templateMessage: Imenu) => {
    return socket.sendMessage(remoteJid, templateMessage);
  };

  return {
    botInfo,
    isOwner,
    reply,
    sendText,
    webMessage,
    sendMenu
  };
};
