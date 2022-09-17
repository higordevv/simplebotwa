import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import { read_keyWord, sch_keyWord } from "../model/keyword_model/key_word";


export default async function (bot: Ibot) {
  const { webMessage, reply,sendText } = bot;

  const result: any = await read_keyWord()
  
 
  try {
   
  await reply(`todas as palavras chaves cadastradas até o momento: \n${result.map((data: any,i:number) => { return `[${i}]  "${data.key_word}"\n` })
      } `.replace(/,/g,''))
      return sendText(`para ver cada resposta de uma palavra chave digite:\n *${data.prefix}verKeyword palavra*.`)
  }catch(err){
    console.log(err)
    return reply('erro interno contate o desenvolvedor')
  }

  
}