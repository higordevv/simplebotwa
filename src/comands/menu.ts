import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

export default async function menu(bot: Ibot) {
  const { webMessage, sendMenu } = bot;

  const buttons = [
    {
      index: 1,
      quickReplyButton: { displayText: "⚙️ Comandos", id: "!comandos" },
    },
  ];
  const menu = {
    text: `
        _bot Pereira😎  v${data.version}_\n
  [💪]  *Dono:* +${data.owner}\n 
  Prefix: "${data.prefix}"`,
    footer: "by Cyber Devs",
    templateButtons: buttons,
  };

  return await sendMenu(menu);
}
