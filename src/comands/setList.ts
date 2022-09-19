import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

export default async function setList(bot: Ibot) {
  const { webMessage, reply } = bot;
  const { msgRecept } = data;
  const { list } = msgRecept;

  return await reply(list);
}
