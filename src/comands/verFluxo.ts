import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import { consult_fluxoMsg } from "../model/fluxo_model/fluxo";

export default async function (bot: Ibot, name: string) {
  const { webMessage, reply } = bot;
  if (!name) {
    return reply(
      `Digite o nome junto do comando\n *Exemplo*: ${data.prefix}verFluxo nome do fluxo`
    );
  }
  const result: any = await consult_fluxoMsg(name);
  if (!result) {
    return reply(`Fluxo _${name}_ não encontrado!`);
  }
  try {
    let msgExtraMold = JSON.parse(result.questions);
    return reply(
      `Perguntas do fluxo '_${result.titulo}_':\n \n${msgExtraMold.map(
        (data: any, i: number) => {
          return `[${i}]  "${data.pergunta}"\n`;
        }
      )}\n `.replace(/,/g, "")
    );
  } catch (err) {
    console.log(err);
    return reply("Erro interno contate o desenvolvedor");
  }
}
