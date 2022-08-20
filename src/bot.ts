import { Connect } from "./connection";
import { botFunctions } from "./functions/botFunctions";

export async function bot() {

    const socket = await Connect();
  socket.ev.on('messages.upsert',async (msg)=>{
    const [webMessage]=msg.messages
    const bot = botFunctions(webMessage, socket)
      const{sendText,reply} = bot
      
  })  
};