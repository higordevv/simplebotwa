import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import cliente from "../model/cliente_model/cliente";

export default async function (bot: Ibot, listaHour: string) {
  const { webMessage, reply, sendText, socket } = bot;
  const params = listaHour.split("#");
  const list = await cliente.consultList(params[0]);
  if (!params[1]) {
    return reply(
      `Use # para separar a lista e o horario de envio\n Exemplo: *${data.prefix}disparoTemp* nome da lista#00:00`
    );
  }
  if (!list || list.length < 1) {
    return reply(
      `Lista nao encontrada, use # para separar a lista e o horario de envio\n Exemplo: *${data.prefix}disparoTemp* nome da lista#00:0`
    );
  }
  await reply(
    data.msgRecept.sendForList + list[0].tipoDeCliente + "#" + params[1]
  );
  return sendText(
    "Para usar variaveis siga esse exemplo: '<variavel>' (com aspas e <>)."
  );
}
