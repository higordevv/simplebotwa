import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import path from "path";
import comandsList from "../bot_config/comandsList";
import { toJsonArrays } from "../functions/importJsonData";
import cliente from "../model/cliente";

export default async function setMsg(bot: Ibot, lista: string) {
  const { webMessage, reply, sendText, socket } = bot;
  const list = await cliente.consultList(lista)
  if (!list || list.length < 1) {
    return reply(

      `[!] Lista nao encontrada porfavor use o comando ${data.prefix}setList`

    );
  }
  reply(data.msgRecept.sendForList+list[0].tipoDeCliente)
    );
  }
  let listWebNumbers = list.map((item) => {
    return (item += `@s.whatsapp.net`);
  });
  reply(`[!] Enviando mensagens para a lista...`);
  for await (let number of listWebNumbers) {
    await socket.sendMessage(number, { text: message });
    console.log(`[!] Mensagem enviada para ${number}`);
  }

}
