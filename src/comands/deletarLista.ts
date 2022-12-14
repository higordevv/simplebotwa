import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import cliente from "../model/cliente_model/cliente";


export default async function (bot: Ibot, nome:string) {
    const { webMessage, reply,isOwner,remoteJid } = bot;
 if(!remoteJid){
  return
 }
  if(!(await isOwner(remoteJid))){
    return reply(`não autorizado`)
  }
if(!nome){
    return reply(`Digite o nome da lista que deseja deletar\n Exemplo: *${data.prefix}deletarLista nome da lista*`)
}
const array=await cliente.consultList(nome)
if(!array || array.length<1){
    return reply('Lista não encontrada 😐')
}
await reply(`🗑️ Excluindo itens da lista ${nome}`)
array.map(async(value)=>{
   await cliente.deleteOne(value.id)
})
return reply(`Lista *${nome}* apagada, você pode recadastrar a lista com o comando *${data.prefix}setList*`)
}