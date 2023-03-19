import { data } from "./bot_config/config";
import { Connect } from "./connection";

export async function bot() {
  const socket = await Connect();
  socket.ev.on("messages.upsert", async (msg) => {
    //console.log('entrou')
    const [webMessage] = msg.messages;
    const message = webMessage.message;
    const number = webMessage.key.remoteJid?.split(`@`)[0];
    if (!number) {
      return;
    }
    //nao falar em grupos
    if (webMessage.key.participant) {
      return;
    }
  });
}
