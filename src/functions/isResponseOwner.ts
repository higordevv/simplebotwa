import { proto } from "@adiwajshing/baileys";
import { data } from "../bot_config/config";
import { Ibot } from "../interfaces/Ibot";
import { Iclient } from "../interfaces/Iclient";
import cliente from "../model/cliente_model/cliente";
import Eval from "./eval";

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
    const clientes:Iclient|any = list.map(async (data) => {
      if (data.extraMsg) {
        let newdata=data
        newdata.extraMsg = JSON.parse(data.extraMsg)
        return newdata
      } else { return [] }
     

    })
  

    console.log(clientes)
    let contact: Iclient;
    for await (contact of clientes) {
      if(!message.extendedTextMessage?.text){
        return
      }
      let msg=Eval(contact,message.extendedTextMessage.text)

      if(!msg){
        return console.log('não enviado erro no processamento da frase')
      }
      await socket.sendMessage(`${contact.numero}@s.whatsapp.net`, { text: msg});
      console.log(`[!] Mensagem enviada para ${contact.nome}`);
    }
    return reply(`mensagem enviada para todos os clientes da lista: ${listName}`)
  } catch (err) {
    console.log(err)
    return;
  }
}