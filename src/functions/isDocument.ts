import { proto } from "@adiwajshing/baileys";
import { readFileSync } from "fs";
import { downloadDocumentmessage } from "./downloadDoc";

export async function isTxt(message: proto.IMessage) {
  let doc = message.documentMessage;

  if (!doc) {
    return;
  }

  const caminho = await downloadDocumentmessage(doc);

  if (caminho) {
    readFileSync(caminho).toString("utf8").split("\n");
  }

  let list = [{numbers: caminho}];
  console.log(list);

  return list;
}
