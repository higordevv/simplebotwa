import { data } from "./bot_config/config";
import { Connect } from "./connection";
import { botFunctions } from "./functions/botFunctions";
import { isComand,caseComand,searchComand } from "./functions/treatComand";

export async function bot() {

    const socket = await Connect();
  socket.ev.on('messages.upsert',async (msg)=>{
    const [webMessage]=msg.messages
    const bot = botFunctions(webMessage, socket)
      const{sendText,reply} = bot
      const message = webMessage.message
      if(!message){
            return
        }
        //se message nao tem o prefixo
        if (!isComand(message)) {
            return
        }

        //se o comando nao existe

        if (!searchComand(webMessage)) {

            return reply(`comando não encontrado!*`)
        }
        //sem barreiras, comandos seguem apartir daqui
        await caseComand(bot)
  })  
};