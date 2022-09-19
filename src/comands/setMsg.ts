import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import cliente from "../model/cliente_model/cliente";

export default async function setMsg(bot: Ibot, lista: string) {
  const { webMessage, reply, sendText, socket } = bot;
  const list = await cliente.consultList(lista);
  if (!list || list.length < 1) {
    return reply(
      `Lista nao encontrada, caso não esteja cadastrada por favor use o comando *${data.prefix}setList* para cadastrar.`
    );
  }
  await reply(data.msgRecept.sendForList + list[0].tipoDeCliente);
  return sendText(
    "Para usar variaveis siga esse exemplo: '<variavel>' (com aspas e <>)."
  );
}
