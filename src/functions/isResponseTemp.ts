import { proto } from "@adiwajshing/baileys";
import { CronJob } from "cron";
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
  const time = item[1]
  const horas = new Date()

  if (quoted != data.msgRecept.sendForList + item[0].trim() + "#" + item[1]) {
    return
  }
  await reply('mensagem marcada para ' + item[1] + '\n(fique atendo ao terminal, você será avisado por aqui também.)')
  const listName = item[0].trim()

  const list = await cliente.consultList(listName)

  const clientes: Iclient | any = list.map(async (data) => {
    if (data.extraMsg) {
      let newdata = data
      newdata.extraMsg = JSON.parse(data.extraMsg)
      return newdata
    } else { return [] }
  })


  let hmMarked = time.split(':').map((v)=>{return parseInt(v)})
horas.setHours(hmMarked[0])
horas.setMinutes(hmMarked[1])

  let contact: Iclient;
  const cronJob = new CronJob(horas,
  async()=>{
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

  },null,
	true,
	'America/Sao_Paulo')
  cronJob.start()
 

}