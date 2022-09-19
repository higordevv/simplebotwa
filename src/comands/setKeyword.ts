import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

export default async function (bot: Ibot) {
  const { webMessage, reply } = bot;
  const { msgRecept } = data;
  const { keyword } = msgRecept;

  return await reply(keyword);
}
