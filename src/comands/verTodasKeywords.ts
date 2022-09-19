import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import { read_keyWord } from "../model/keyword_model/key_word";

export default async function (bot: Ibot) {
  const { webMessage, reply, sendText } = bot;

  const result: any = await read_keyWord();

  try {
    await reply(
      `Todas as palavras chaves cadastradas até o momento: \n${result.map(
        (data: any, i: number) => {
          return `[${i}]  "${data.key_word}"\n`;
        }
      )} `.replace(/,/g, "")
    );
    return sendText(
      `Para ver cada resposta de uma palavra chave digite:\n *${data.prefix}verKeyword palavra*.`
    );
  } catch (err) {
    console.log(err);
    return reply("Erro interno contate o desenvolvedor");
  }
}
