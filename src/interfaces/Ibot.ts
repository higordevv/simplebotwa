import { proto } from "@adiwajshing/baileys";
import { Imenu } from "./Imenu";
import { PathOrFileDescriptor } from "fs";
export interface Ibot {
  remoteJid?: string | undefined | null;
  socket: any;
  botInfo: { id: string; name: string };
  //boolean check owner
  isOwner: (id: string) => Promise<boolean>;
  isUser: (id: string) => Promise<boolean>;
  //sendText functions
  sendText: (text: string) => Promise<proto.IWebMessageInfo>;
  reply: (text: string) => Promise<proto.IWebMessageInfo>;
  sendMenu: (object: Imenu) => Promise<proto.WebMessageInfo>;
  webMessage: proto.IWebMessageInfo;
}
