import { data } from "./bot_config/config";
import { Connect } from "./connection";

export async function bot() {

  const socket = await Connect();
  
  socket.ev.on("messages.upsert", async (msg) => {
    const [ webMessage ] = msg.messages;
    const message = webMessage.message;
    const rJid = msg.messages[0].key.remoteJid;
    
    // Check
    if (!rJid) return;
    if (webMessage.key.participant) return;

    message ? console.log(message) : null
  })
}
