import { proto } from "@adiwajshing/baileys";
import { readFileSync } from "fs";
import { data } from "../bot_config/config";
import { downloadDocumentmessage } from "./downloadDoc";
import path from "path"
import fs from "fs"
export async function isTxt(message: proto.IMessage) {
  let doc = message.documentMessage;
 let quoted = doc?.contextInfo?.quotedMessage?.conversation
 
  if (!doc) {
    return;
  }
//se nao for resposta volte
if(quoted!= data.msgRecept.list){
    return 
}
  const caminho = await downloadDocumentmessage(doc);

  if (!caminho) {
    return
}
let arq=readFileSync(caminho).toString("utf8").split("\n");
let list = arq.map((item)=>item.replace(/\r/g,``))

console.table(list);
fs.writeFileSync(path.resolve("cache","lista.json"),JSON.stringify(list))
fs.unlinkSync(caminho)
return list;

}
