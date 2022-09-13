import { proto } from "@adiwajshing/baileys";
import { readFileSync } from "fs";
import { data } from "../bot_config/config";
import { downloadDocumentmessage } from "./downloadDoc";
import path from "path";
import fs from "fs";
import { Iclient } from "../interfaces/Iclient";

export async function isTxt(message: proto.IMessage) {
  let doc = message.documentMessage;
  let quoted = doc?.contextInfo?.quotedMessage?.conversation;
  if (!doc) {
    return;
  }

  if (quoted != data.msgRecept.list) {
    return;
  }
  const caminho = await downloadDocumentmessage(doc);

  if (!caminho) {
    return;
  }
  let arq = readFileSync(caminho).toString("utf8").split("\n");

  let items = arq.map((data: any, i) => {
    if (i == 0) {
      return
    }
    const values = data.split(",");
    const clientObj: Iclient = {
      nome: values[0],
      numero: values[1],
      tipoDeClient: arq[0],
    };

    return clientObj

  });
  const formatItems = items.filter((value) =>
    value != undefined &&
    value != null &&
    value.nome != undefined &&
    value.numero != undefined &&
    value.tipoDeClient != undefined &&
    value.nome.length > 1 &&
    value.numero.length > 1 &&
    value.tipoDeClient.length > 1


  )
  fs.writeFileSync(path.resolve("cache", "lista.json"), JSON.stringify(formatItems));
  fs.unlinkSync(caminho);
  console.log(formatItems)
  return formatItems;
}
