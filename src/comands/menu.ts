import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import comandsList from "../bot_config/comandsList";

export default async function menu(bot: Ibot) {
  const { webMessage, sendMenu } = bot;

  const buttons = [
    {
      index: 1,
      quickReplyButton: { displayText: "⚙️ Comandos", id: "!comandos" },
    },
  ];
  const menu = {
    text: `botPereira😎 v${data.version}\n *💪Dono:* +${data.owner}\n Prefix: "${data.prefix}"`,
    footer: "by Cyber Devs",
    templateButtons: buttons
  };

  return  await sendMenu(menu)
}
