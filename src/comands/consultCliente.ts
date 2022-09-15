import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import cliente from "../model/cliente";

export default async function (bot: Ibot, name: string) {
    const { webMessage, reply,sendText } = bot;
    if (!name) {
        return reply(`digite o nome da lista junto do comando\n *Exemplo*: ${data.prefix}verCliente nome do cliente`)
    }
    const res: any = await cliente.consultOne(name)

    if (!res) {
        return reply('cliente não encontrado, por favor digite o *nome completo do cliente*')
    }

    const template = `*🌐CLIENTE ENCONTRADO🌐*\n\n*cliente*: ${res.nome}\n*numero*: ${res.numero}\n*tipo*: ${res.tipoDeCliente}`

    await reply(template)
return sendText(``)
}