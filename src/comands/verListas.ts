import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import cliente from "../model/cliente";

export default async function (bot: Ibot, listname:string) {
  const { webMessage, reply } = bot;
  if(!listname){
    return reply(`digite o nome da lista junto do comando\n *Exemplo*: ${data.prefix}verLista nome da lista`)
  }
  const list= await cliente.consultList(listname)

  if(list.length<1){
  return reply('lista não encontrada')  
  }

  const template=`🌐lista da categoria: ${list[0].tipoDeCliente}\n \n ${list.map((data,i)=>{
    return (`*[${i}].${data.nome}*: ${data.numero} \n`)
  })} `.replace(/,/g,'')
  
return reply(template)
  
}