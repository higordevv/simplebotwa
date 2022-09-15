import { proto } from "@adiwajshing/baileys";
import { data } from "../bot_config/config";
import { Ibot } from "../interfaces/Ibot";
import cliente from "../model/cliente";

export default async function (bot: Ibot, message: proto.IMessage) {
  const { socket, reply } = bot;
  let quoted = message.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
  if (!quoted) {
    return;
  }
  const item = quoted.split(':')
  if (item.length != 2) { return }
  try {
    console.log(item)
    const listName = item[1].trim()
    console.log(listName)
    if (quoted != data.msgRecept.sendForList + listName) {
      return
    }
    const list = await cliente.consultList(listName)
    const clientes = list.map(async (data) => {
      if (data.extraMsg) {
        data.extraMsg = JSON.parse(data.extraMsg)
        return data
      } else { return [] }
      //eval vai entrar aqui
      //


    })
    console.log(clientes)
    let contact: any;
    for await (contact of clientes) {

      await socket.sendMessage(`${contact.numero}@s.whatsapp.net`, { text: message.extendedTextMessage?.text });
      console.log(`[!] Mensagem enviada para ${contact.nome}`);
    }
    return reply(`mensagem enviada para todos os clientes da lista: ${listName}`)
  } catch (err) {
    console.log(err)
    return;
  }
}