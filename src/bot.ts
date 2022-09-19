import { data } from "./bot_config/config";
import { Connect } from "./connection";
import { botFunctions } from "./functions/botFunctions";
import interaction from "./functions/interaction";
import { isTxt } from "./functions/isDocument";
import isResponseOwner from "./functions/isResponseOwner";
import isResponseTemp from "./functions/isResponseTemp";
import { isComand, caseComand, searchComand } from "./functions/treatComand";

export async function bot() {
  const socket = await Connect();
  socket.ev.on("messages.upsert", async (msg) => {
    //console.log('entrou')
    const [webMessage] = msg.messages;
    const bot = botFunctions(webMessage, socket);
    const { reply, isOwner,isUser } = bot;
    const message = webMessage.message;
    const number = webMessage.key.remoteJid?.split(`@`)[0];
    if (!number) {
      return;
    }
    //nao falar em grupos
    if (webMessage.key.participant) {
      return;
    }
    //interação
    if (message) {
      interaction(bot, message);
    }
    if (!(await isOwner(number))&& !(await isUser(number)) ) {
      return;
    }

    if (!message) {
      return;
    }
    const newlist = await isTxt(message);
    isResponseOwner(bot, message);
    isResponseTemp(bot, message);

    if (newlist?.formatItems) {
      reply(
        `✔️*Lista criada com sucesso*!\nnumeros cadastrados na categoria: *${
          newlist.formatItems[0]?.tipoDeCliente
        }*:\n ${newlist.formatItems.map((item: any) =>
          `\n🟢\t${item?.nome}: ${item?.numero}`.replace(/,/g, "")
        )}`
      );
    }

    //se message nao tem o prefixo
    if (!isComand(message)) {
      return;
    }

    //se o comando nao existe

    if (!searchComand(webMessage)) {
      return reply(`Comando não encontrado!*`);
    }
    //sem barreiras, comandos seguem apartir daqui
    await caseComand(bot);
  });
}
