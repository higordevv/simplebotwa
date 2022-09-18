import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import { delete_keyWord, read_keyWord, sch_keyWord } from "../model/keyword_model/key_word";
import { delete_msg } from "../model/fluxo_model/fluxo";


export default async function (bot: Ibot, name: string) {
  const { webMessage, reply } = bot;
  if (!name) {
    return reply(`digite o nome da palavra junto do comando\n *Exemplo*: ${data.prefix}apagarFluxo nome`)
  }
  const result: any = await delete_msg(name)
  
  if (!result) {
    return reply(`fluxo '${name}' não encontrado, cadastre usando *${data.prefix}setFluxo*`)
  }
return reply(`*${name}* deletado!`)
}