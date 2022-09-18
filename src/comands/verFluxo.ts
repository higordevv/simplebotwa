import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import { consult_fluxoMsg } from "../model/fluxo_model/fluxo";

export default async function (bot: Ibot, name: string) {
  const { webMessage, reply } = bot;
  if (!name) {
    return reply(`digite o nome junto do comando\n *Exemplo*: ${data.prefix}verFluxo nome do fluxo`)
  }
  const result:any = await consult_fluxoMsg(name)
  if (!result) {
    return reply(`fluxo _${name}_ não encontrado!`)
  }
  try {
    let msgExtraMold = JSON.parse(result.questions)
    return reply(`perguntas do fluxo '_${result.titulo}_':\n \n${msgExtraMold.map((data: any,i:number) => { return `[${i}]  "${data.pergunta}"\n` })
      }\n `.replace(/,/g,''))
  }catch(err){
    console.log(err)
    return reply('erro interno contate o desenvolvedor')
  }

  
}