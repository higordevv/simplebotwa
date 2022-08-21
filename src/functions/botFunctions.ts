import { proto} from "@adiwajshing/baileys";
import { data } from "../bot_config/config";
import { Ibot } from "../interfaces/Ibot";

export const botFunctions=(webMessage:proto.IWebMessageInfo,socket:any):Ibot=>{
    const { remoteJid, participant } = webMessage.key
    
    const botInfo = socket.user
    const isOwner =async(number:string)=>{
        let numberFormated=number.split(`@`)[0]      
        if(numberFormated==data.owner){
            return true
        }
        return false
    }
    const sendText = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt })
    }
    const reply = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
    }
    return{
        botInfo,
        isOwner,
        reply,
        sendText,
        webMessage
    }
}