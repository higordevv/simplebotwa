import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import comandsList from "../bot_config/comandsList";

export default async function comandos(bot: Ibot) {
  const { webMessage, reply } = bot;
let template=` Comandos:\n`
 comandsList.map((obj)=>{
    template+=`\n*${data.prefix}${obj.comand}* ➔ _${obj.resume}_`
 }) 
 return reply(template)
}