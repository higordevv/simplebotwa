import { proto } from "@adiwajshing/baileys";
import { readFileSync } from "fs";
import { data } from "../bot_config/config";
import { downloadDocumentmessage } from "./downloadDoc";
import path from "path";
import fs from "fs";
import { Iclient } from "../interfaces/Iclient";
import cliente from "../model/cliente_model/cliente";
import keywordConstructor from "./keywordConstructor";
import { create_keyWord } from "../model/keyword_model/key_word";
import fluxConstrutor from "./fluxConstrutor";
import { create_fluxo } from "../model/fluxo_model/fluxo";

export async function isTxt(message: proto.IMessage) {
  const { list, keyword, fluxo } = data.msgRecept;
  let doc = message.documentMessage;
  let quoted = doc?.contextInfo?.quotedMessage?.conversation;
  if (!doc) {
    return;
  }
  const caminho = await downloadDocumentmessage(doc);

  if (!caminho) {
    return;
  }
  switch (quoted) {
    case list:
      let arq = readFileSync(caminho).toString("utf8").split("\n");

      let items = arq.map((data: any, i) => {
        if (i == 0) {
          return;
        }
        const values = data.split(",");
        const clientObj: Iclient = {
          nome: values[0],
          numero: values[1],
          tipoDeCliente: arq[0],
          extraMsg: values.splice(2, values.length),
        };

        return clientObj;
      });
      const formatItems = items.filter(
        (value) =>
          value != undefined &&
          value != null &&
          value.nome != undefined &&
          value.numero != undefined &&
          value.tipoDeCliente != undefined &&
          value.nome.length > 1 &&
          value.numero.length > 1 &&
          value.tipoDeCliente.length > 1
      );
      const { create } = cliente;
      for await (let item of formatItems) {
        if (!item) {
          return;
        }
        const obj = {
          nome: item?.nome,
          numero: item.numero,
          tipoDeCliente: item.tipoDeCliente,
          extraMsg: JSON.stringify(item?.extraMsg),
        };

        create(obj);
      }
      fs.unlinkSync(caminho);

      return { formatItems, aviso: "criada lista de clientes" };
    case keyword:
      let linesKey = readFileSync(caminho).toString("utf8").split("\n");
      let keytxt;
      fs.unlinkSync(caminho);

      for await (keytxt of linesKey) {
        const keywordNew = keywordConstructor(keytxt);
        if (!keywordNew) {
          return;
        }

        let keywordDb = {
          key_word: keywordNew.key_word,
          answers: JSON.stringify(keywordNew.answers),
        };
        try {
          await create_keyWord(keywordDb);
        } catch {
          console.log("erro ao salvar keyword");
        }
      }
      return;
    case fluxo:
      let flux = fluxConstrutor(
        readFileSync(caminho).toString("utf8").split("\n")
      );
      if (flux) {
        let obj: any = flux;
        obj.questions = JSON.stringify(flux.questions);
        await create_fluxo(obj);
      }
      fs.unlinkSync(caminho);
      return;
    default:
      fs.unlinkSync(caminho);

      return;
  }
}
