import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import cliente from "../model/cliente_model/cliente";

export default async function (bot: Ibot, name: string) {
    const { webMessage, reply,sendText } = bot;
    if (!name) {
        return reply(`Digite o nome da lista junto do comando\n *Exemplo*: ${data.prefix}verCliente nome do cliente`)
    }
    const res: any = await cliente.consultOne(name)

    if (!res) {
        return reply('Cliente não encontrado, por favor digite o *nome completo do cliente* junto com o comando.')
    }

    const template = `*🌐CLIENTE ENCONTRADO🌐*\n\n*Cliente*: ${res.nome}\n*Numero*: ${res.numero}\n*Tipo*: ${res.tipoDeCliente}`

    await reply(template)
return sendText(`Para ver os parâmetros extras de algum cliente digite \n*${data.prefix}msgExtra nome do cliente*`)
}