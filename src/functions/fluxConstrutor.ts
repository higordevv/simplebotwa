import { Ifluxo } from "../interfaces/Ifluxo";

export default function (txt: string[]) {
  if (!txt) {
    return;
  }
  let formated = txt.map((x) => x.split("|"));
  formated = formated.filter((x) => {
    return x.length > 3;
  });
  let fluxmap: Ifluxo = {
    titulo: txt[0],
    questions: [],
  };
  const fluxoFinal = formated.map((array) => {
    let obj = {
      pergunta: array[0],
      possivelResposta: array[1],
      resposta: "",
      contraria: array[2],
      nomeVar: array[3],
    };
    fluxmap.questions?.push(obj);
  });
  //console.log(fluxmap)
  return fluxmap;
}
