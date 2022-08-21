import { data } from "../bot_config/config";
//proto
import { proto } from "@adiwajshing/baileys";
//interface
import { Ibot } from "../interfaces/Ibot";
import comandsList from "../bot_config/comandsList";
import menu from "../comands/menu";
import comandos from "../comands/comandos";

//checar se mensagem é um comando
export function isComand(message: proto.IMessage) {
  const texto =
    message?.conversation ||
    message?.imageMessage?.caption ||
    message?.extendedTextMessage?.text ||
    message.videoMessage?.caption ||
    message.templateButtonReplyMessage?.selectedId;

  if (!texto) {
    return;
  }
  let prefix = texto.split("")[0];
  if (prefix == data.prefix) {
    return true;
  } else return false;
}
//procurar comando da comandlist
export function searchComand(Webmessage: proto.IWebMessageInfo) {
  const { message } = Webmessage;

  const comand = parameters(extractComand(message));
  let exists = comandsList.find((str) => str.comand == comand[0]);
  if (exists) {
    return true;
  } else {
    return false;
  }
}
//extrair parametro
export function parameters(comand: string) {
  const array = comand.split(" ").filter((x) => {
    return x.length > 1;
  });
  let parametro = array.filter((element) => element != array[0]);

  return [array[0], parametro.toString().replace(/,/g, " ")];
}
//cases de comandos
export async function caseComand(bot: Ibot) {
  const comand = parameters(extractComand(bot.webMessage.message));
  //cases dos comands
  switch (comand[0]) {
    case `menu`:
      await menu(bot);
      break;
    case `comandos`:
      await comandos(bot)
      break
    default:
      bot.reply(`erro interno!`)
      break
  }
  console.log(comand);
}
//extrair comando da mensagem
export function extractComand(msg: proto.IMessage | any) {
  const texto =
    msg.conversation ||
    msg.imageMessage?.caption ||
    msg.extendedTextMessage?.text ||
    msg.videoMessage?.caption ||
    msg.templateButtonReplyMessage?.selectedId;
  const comand = texto?.replace(data.prefix, "");
  return comand;
}
