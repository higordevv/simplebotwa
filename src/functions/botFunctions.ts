import { proto } from "@adiwajshing/baileys";
import { data } from "../bot_config/config";
import { Ibot } from "../interfaces/Ibot";
import { Imenu } from "../interfaces/Imenu";

export const botFunctions = (
  webMessage: proto.IWebMessageInfo,
  socket: any
): Ibot => {
  const { remoteJid, participant } = webMessage.key;

  const botInfo = socket.user;
  const isOwner = async (number: string) => {
    let numberFormated = number.split(`@`)[0];
    for await (let numberOw of data.owner) {
      if (numberFormated == numberOw) {
        return true;
      }
    }

    return false;
  };
  const isUser = async (number: string) => {
    let numberFormated = number.split(`@`)[0];
    for await (let numberOw of data.user) {
      if (numberFormated == numberOw) {
        return true;
      }
    }

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
    remoteJid,
    botInfo,
    isOwner,
    reply,
    sendText,
    webMessage,
    sendMenu,
    socket,isUser
  };
};
