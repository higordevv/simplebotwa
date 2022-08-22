import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import path from "path";
import comandsList from "../bot_config/comandsList";
import { toJsonArrays } from "../functions/importJsonData";

export default async function setMsg(bot: Ibot, message: string) {
  const { webMessage, reply, sendText, socket } = bot;
  const list = toJsonArrays(path.resolve("cache", "lista.json"));
  if (!list || list.length < 1) {
    return reply(
      `lista nao encontrada porfavor use o comando ${data.prefix}setList`
    );
  }
  let listWebNumbers = list.map((item) => {
    return (item += `@s.whatsapp.net`);
  });
  reply(`enviando mensagens para a lista...`);
  for await (let number of listWebNumbers) {
    await socket.sendMessage(number, { text: message });
    console.log(`[!] Mensagem enviada para ${number}`);
  }
}
