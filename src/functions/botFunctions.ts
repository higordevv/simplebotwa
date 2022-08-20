import { proto} from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";

export const botFunctions=(webMessage:proto.IWebMessageInfo,socket:any):Ibot=>{
    const { remoteJid, participant } = webMessage.key
    
    const botInfo = socket.user
    const isOwner =async()=>{
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