import { Iclient } from "../interfaces/Iclient";
import { proto } from "@adiwajshing/baileys";

function Eval(cliente: Iclient, msg: string) {
  const{nome,numero,extraMsg,tipoDeCliente}=cliente
  try {
  
    //Formato da msg
    const StringMsg = msg;
    //Cocatena 
    let frase = `'${StringMsg}'`;
    let nFrase = frase.replace(/[<>]/g, " +");
    nFrase = nFrase.replace(/[()]/g, " +");
    //Eval
    console.log("olha isso"+extraMsg)
    return eval(nFrase);
  } catch (e) {
    console.log(e)
    return false;
  }
}

export default Eval;
