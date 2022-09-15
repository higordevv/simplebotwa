import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";
import path from "path";
export default async function menu(bot: Ibot) {
  const { webMessage, sendMenu } = bot;

  const buttons = [
    {
      buttonId: `${data.prefix}comandos`,
      buttonText: { displayText: "⚙️ Comandos" },
      type: 1,
    },
    {
      buttonId: `${data.prefix}setList`,
      buttonText: { displayText: "⚙️ Gerar Lista" },
      type: 1,
    },
    {
      buttonId: `${data.prefix}setClass`,
      buttonText: { displayText: "👥 Criar Classe" },
      type: 2,
    },
  ];

  const menu = {
    image: { url: path.resolve("assets", "img", "perfil.png") },
    caption: `painel de controle\n *⚖️Juribot*`,
    footer: "by ErwinSystem",
    buttons: buttons,
    headerType: 1,
  };

  return await sendMenu(menu);
}
