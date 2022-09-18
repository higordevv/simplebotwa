import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import path from "path";
import comandsList from "../bot_config/comandsList";
import { toJsonArrays } from "../functions/importJsonData";
import cliente from "../model/cliente_model/cliente";
import { consult_fluxoMsg } from "../model/fluxo_model/fluxo";
import flux from "../functions/flux";

export default async function (bot: Ibot, listaEflux: string) {
  const { webMessage, reply, sendText, socket } = bot;
  const infos=listaEflux.split('#')
  if(infos.length!=2){
    return reply(`para enviar um fluxo para uma lista use o comando com o nome da lista e o fluxo
    *Ex*:${data.prefix}disparoFluxo nome da lista#fluxo`)
  }
  const list = await cliente.consultList(infos[0])
const fluxo=await consult_fluxoMsg(infos[1])
  if (!list || list.length < 1) {
    reply(
      `lista nao encontrada, caso não esteja cadastrada por favor use o comando *${data.prefix}setList* para cadastrar.`
    );
    return reply(`para enviar um fluxo para uma lista use o comando com o nome da lista e o fluxo
    *Ex*:${data.prefix}disparoFluxo nome da lista#fluxo`)
  }
  if (!fluxo) {
    reply(
      `fluxo não encontrado, caso não esteja cadastrado por favor use o comando *${data.prefix}setFluxo* para cadastrar.`
    );
    return reply(`para enviar um fluxo para uma lista use o comando com o nome da lista e o fluxo
    *Ex*:${data.prefix}disparoFluxo nome da lista#fluxo`)
  }
//
await reply('disparando fluxo...(você será retornado com todas as respostas)')
for await (let cli of list){
  let cliente=cli
  let extr=cli.extraMsg?.toString()

  if(!extr){
    return
  }
  cliente.extraMsg=JSON.parse(extr)
  
 
  await flux(cliente,fluxo,bot)

}

}