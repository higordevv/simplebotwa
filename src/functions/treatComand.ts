import { data } from "../bot_config/config";
//proto
import { proto } from "@adiwajshing/baileys";
//interface
import { Ibot } from "../interfaces/Ibot";
import comandsList from "../bot_config/comandsList";
import menu from "../comands/menu";
import comandos from "../comands/comandos";
import setList from "../comands/setList";
import setMsg from "../comands/setMsg";
import verListas from "../comands/verListas";
import verMsg from "../comands/verMsg";
import deletarLista from "../comands/deletarLista";
import consultCliente from "../comands/consultCliente";
import setTempMsg from "../comands/setTempMsg";
import setKeyword from "../comands/setKeyword";
import setFluxo from "../comands/setFluxo";
import verKeywords from "../comands/verKeywords";
import deletarKeyword from "../comands/deletarKeyword";
import verTodasKeywords from "../comands/verTodasKeywords";
import verFluxo from "../comands/verFluxo";
import verTodosFluxos from "../comands/verTodosFluxos";
import deletarFluxo from "../comands/deletarFluxo";
import disparoFluxo from "../comands/disparoFluxo";

//checar se mensagem é um comando
export function isComand(message: proto.IMessage) {

  const texto = message?.conversation ||
    message?.imageMessage?.caption ||
    message?.extendedTextMessage?.text ||
    message.videoMessage?.caption ||
    message.templateButtonReplyMessage?.selectedId ||
    message.buttonsResponseMessage?.selectedButtonId




  if (!texto) {
    return
  }
  try {
    let prefix = texto.split("")[0]
    if (prefix == data.prefix) {
      return true
    } else return false
  } catch (err) {
    return false
  }
}
//procurar comando da comandlist
export function searchComand(Webmessage: proto.IWebMessageInfo) {
  const { message } = Webmessage

  const comand = parameters(extractComand(message))
  let exists = comandsList.find(str => str.comand == comand[0])
  if (exists) {
    return true
  } else {
    return false
  }
}
//extrair parametro
export function parameters(comand: string) {

  if (!comand) {
    return [comand]
  }
  const array = comand.split(" ").filter((x) => { return x.length > 1 })
  let parametro = array.filter(element => element != array[0])

  return [array[0], parametro.toString().replace(/,/g, " ")]
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
    case `setList`:
      await setList(bot)
      break
    case `disparo`:
      await setMsg(bot, comand[1])
      break
    case `verLista`:
      await verListas(bot, comand[1])
      break
    case `msgExtra`:
      await verMsg(bot, comand[1])
      break
    case `verCliente`:
      await consultCliente(bot, comand[1])
      break
    case `verKeyword`:
      await verKeywords(bot, comand[1])
      break
    case `apagarLista`:
      await deletarLista(bot, comand[1])
      break
    case `disparoTemp`:
      await setTempMsg(bot, comand[1])
      break
    case `apagarKeyword`:
      await deletarKeyword(bot, comand[1])
      break
    case `verTodasKeywords`:
      await verTodasKeywords(bot)
      break
    case `verFluxo`:
      await verFluxo(bot, comand[1])
      break
    case `verTodosFluxos`:
      await verTodosFluxos(bot)
      break
      case `apagarFluxo`:
        await deletarFluxo(bot,comand[1])
        break
    case `setKeyword`:
      await setKeyword(bot)
      break
    case `setFluxo`:
      await setFluxo(bot)
      break
      case `disparoFluxo`:
      await disparoFluxo(bot,comand[1])
      break
    default:
      bot.reply(`erro interno!`)
      break

  }

}
//extrair comando da mensagem
export function extractComand(msg: proto.IMessage | any) {
  const texto =
    msg.conversation ||
    msg.imageMessage?.caption ||
    msg.extendedTextMessage?.text ||
    msg.videoMessage?.caption ||
    msg.templateButtonReplyMessage?.selectedId ||
    msg.buttonsResponseMessage?.selectedButtonId
  const comand = texto?.replace(data.prefix, "");

  return comand;
}
