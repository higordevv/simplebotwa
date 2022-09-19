import { Iclient } from "../interfaces/Iclient";

function Eval(cliente: Iclient, msg: string | any) {
  let { nome, numero, extraMsg, tipoDeCliente } = cliente;
  let msgExtra = JSON.parse(extraMsg.toString());
  try {
    //Formato da msg
    const StringMsg = msg;
    //Cocatena
    let frase = `'${StringMsg}'`;
    let nFrase = frase.replace(/[<>]/g, " +");
    nFrase = nFrase.replace(/[()]/g, `${'"'}`);
    nFrase = nFrase.replace(/\n*\n*/g, ``);
    //Eval

    return eval(nFrase);
  } catch (e) {
    return false;
  }
}

export default Eval;
