import { proto } from "@adiwajshing/baileys";
import { data } from "../bot_config/config";
import { Ibot } from "../interfaces/Ibot";
import { Iclient } from "../interfaces/Iclient";
import { Ikeyword } from "../interfaces/Ikeyword";
import cliente from "../model/cliente_model/cliente";
import { read_keyWord } from "../model/keyword_model/key_word";
import Eval from "./eval";

export default async function (bot: Ibot, message: proto.IMessage) {
    const { socket, reply } = bot;
    let txt = message.conversation
    const data = await read_keyWord()
    const keywords = data.map((v) => {
        if (v.answers && v.key_word) {
            let obj: Ikeyword = {
                key_word: v.key_word,
                answers: JSON.parse(v.answers)
            }
            return obj
        }
    })
 
    for(let keyword of keywords) {
        if(keyword){
            if(txt?.includes(keyword.key_word.toString())){
                let answer=keyword.answers[parseInt((Math.random()*keyword.answers.length).toFixed(0))]
                if(answer)
                return reply(answer.toString())
            }

        }
    }
    
}