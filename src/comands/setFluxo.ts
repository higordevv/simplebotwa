import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

export default async function (bot: Ibot) {
  const { webMessage, reply,isOwner,remoteJid } = bot;
  if(!remoteJid){
   return
  }
   if(!(await isOwner(remoteJid))){
     return reply(`não autorizado`)
   }
  const { msgRecept } = data;
  const { fluxo } = msgRecept;

  return await reply(fluxo);
}
