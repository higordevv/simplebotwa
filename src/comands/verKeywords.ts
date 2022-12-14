import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import { sch_keyWord } from "../model/keyword_model/key_word";

export default async function (bot: Ibot, name: string) {
  const { webMessage, reply } = bot;
  if (!name) {
    return reply(
      `Digite o nome da palavra junto do comando\n *Exemplo*: ${data.prefix}verKeyword palavra`
    );
  }
  const result: any = await sch_keyWord(name);

  if (!result) {
    return reply(
      `'${name}' não encontrado, cadastre usando *${data.prefix}setKeyword*`
    );
  }
  try {
    let msgExtraMold = JSON.parse(result.answers);
    return reply(
      `A palavra chave *${
        result.key_word
      }* possui essas respostas: \n${msgExtraMold.map(
        (data: any, i: number) => {
          return `[${i}]  "${data}"\n`;
        }
      )} `.replace(/,/g, "")
    );
  } catch (err) {
    console.log(err);
    return reply("Erro interno contate o desenvolvedor");
  }
}
