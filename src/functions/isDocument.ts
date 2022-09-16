import { proto } from "@adiwajshing/baileys";
import { readFileSync } from "fs";
import { data } from "../bot_config/config";
import { downloadDocumentmessage } from "./downloadDoc";
import path from "path";
import fs from "fs";
import { Iclient } from "../interfaces/Iclient";
import cliente from "../model/cliente";

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
      tipoDeCliente: arq[0],
      extraMsg: values.splice(2, values.length)
    };

    return clientObj

  });
  const formatItems = items.filter((value) =>
    value != undefined &&
    value != null &&
    value.nome != undefined &&
    value.numero != undefined &&
    value.tipoDeCliente != undefined &&
    value.nome.length > 1 &&
    value.numero.length > 1 &&
    value.tipoDeCliente.length > 1


  )
  const { create } = cliente
  for await (let item of formatItems) {
    if (!item) { return }
    const obj= {
      nome: item?.nome,
      numero: item.numero,
      tipoDeCliente:item.tipoDeCliente,
      extraMsg:JSON.stringify(item?.extraMsg)

    }
    console.log(obj)
    create(obj)
  
  }
  fs.unlinkSync(caminho);
  console.log(formatItems)
  return formatItems;
}
