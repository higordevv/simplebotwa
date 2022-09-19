import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import { delete_keyWord, read_keyWord, sch_keyWord } from "../model/keyword_model/key_word";


export default async function (bot: Ibot, name: string) {
  const { webMessage, reply,isOwner,remoteJid } = bot;
  if(!remoteJid){
   return
  }
   if(!(await isOwner(remoteJid))){
     return reply(`não autorizado`)
   }
  if (!name) {
    return reply(`Digite o nome da palavra junto do comando\n *Exemplo*: ${data.prefix}apagarKeyword de palavra`)
  }
  const result: any = await delete_keyWord(name)
  
  if (!result) {
    return reply(`'${name}' não encontrado, cadastre usando *${data.prefix}setKeyword*`)
  }
return reply(`*${name}* deletado!`)
}