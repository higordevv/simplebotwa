import { MediaType, proto } from "@adiwajshing/baileys";

export default interface Message {
  text?: string | null;
  type?:
    | "text"
    | "warking"
    | "image"
    | "sticker"
    | "video"
    | "audio"
    | "doc"
    | "quoted";
  name?: string | null;
  number?: string;
  media?: { data: string | null; type?: MediaType; mimetype?: string | null };
  picture?: string | null;
  isMe?: boolean;
  quoted?: boolean;
  read?: boolean;
  msgQuoted?: Message | null;
  msgObject?: proto.IMessage | null;
}
