import { proto } from "@adiwajshing/baileys";
import { readFileSync } from "fs";

export function isTxt(message: proto.IMessage) {
    let doc = message.documentMessage?.directPath

    if(!doc) {
        return
    }

    readFileSync(doc).toString('utf8').split('\n')

    let list = doc

    return list
}