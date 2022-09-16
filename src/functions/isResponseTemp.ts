import { proto } from "@adiwajshing/baileys";
import { data } from "../bot_config/config";
import { Ibot } from "../interfaces/Ibot";
import { Iclient } from "../interfaces/Iclient";
import cliente from "../model/cliente_model/cliente"
import Eval from "./eval";

export default async function (bot: Ibot, message: proto.IMessage) {
  const { socket, reply } = bot;
  let quoted = message.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
  if (!quoted) {
    return;
  }
  let item = quoted.split(':')
  let util = item[1].split('#')

  item = [util[0], `${util[1]}:${item[2]}`]
 
  if (item.length != 2) { return }
  console.log(item)
  if (quoted != data.msgRecept.sendForList + item[0].trim() + "#" + item[1]) {
    return
  }
  await reply('mensagem marcada para ' + item[1] + '\n(caso deseje impedir o envio desligue o bot pelo terminal.)')
  const listName = item[0].trim()
  console.log(listName)
  const list = await cliente.consultList(listName)

  console.log(item)
  const clientes: Iclient | any = list.map(async (data) => {
    if (data.extraMsg) {
      let newdata = data
      newdata.extraMsg = JSON.parse(data.extraMsg)
      return newdata
    } else { return [] }
  })
  
  while (1) {
    const time = item[1]
    const horas = `${new Date().getHours()}:${new Date().getMinutes()}`
    let contact: Iclient;
    if (time == horas) {
      console.log('igual')
      try {

        for await (contact of clientes) {
          if (!message.extendedTextMessage?.text) {
            return
          }
          let msg = Eval(contact, message.extendedTextMessage.text)

          if (!msg) {
            return console.log('[!]mensagem não enviada, erro no processamento da frase')
          }
          await socket.sendMessage(`${contact.numero}@s.whatsapp.net`, { text: msg });
          console.log(`[!] Mensagem enviada para ${contact.nome}`);
        }
        return reply(`mensagem enviada para todos os clientes da lista: ${listName}`)
      } catch (err) {
        console.log(err)
        return;
       
      }

    }
  }
}