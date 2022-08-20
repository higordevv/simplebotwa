import { proto } from "@adiwajshing/baileys";

export interface Ibot{
    // bot data
    botInfo:{id:string,name:string},
   //boolean check owner
    isOwner: (id: string) => Promise<boolean>
    
    //sendText functions
    sendMessage:(text:string)=>Promise<proto.IWebMessageInfo>,
    reply:(text:string)=>Promise<proto.IWebMessageInfo>,
}