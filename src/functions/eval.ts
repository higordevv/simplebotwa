import { Iclient } from "../interfaces/Iclient";
import { proto } from "@adiwajshing/baileys";

function Eval(cliente: Iclient, msg: proto.IMessage) {
  try {

    //Formato da msg
    const StringMsg = msg;
    //Cocatena 
    let frase = `Olá ${cliente.nome}` + StringMsg;
    let nFrase = frase.replace(/[<>]/g, " +");
    nFrase = nFrase.replace(/[()]/g, " +");
    //Eval
    console.log(eval(nFrase));
  } catch (e) {
    return false;
  }
}

export default Eval;
