import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import { read_fluxoMsg } from "../model/fluxo_model/fluxo";

export default async function (bot: Ibot) {
  const { webMessage, reply, sendText } = bot;

  const result: any = await read_fluxoMsg();

  try {
    await reply(
      `Todos os fluxos cadastrados até o momento: \n${result.map(
        (data: any, i: number) => {
          return `[${i}]  "${data.titulo}"\n`;
        }
      )} `.replace(/,/g, "")
    );
    return sendText(
      `Para ver cada pergunta de um fluxo digite:\n *${data.prefix}verFluxo nome do fluxo*.`
    );
  } catch (err) {
    console.log(err);
    return reply("Erro interno contate o desenvolvedor");
  }
}
