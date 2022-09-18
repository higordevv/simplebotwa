import { Ibot } from '../interfaces/Ibot';
import { Iclient } from '../interfaces/Iclient'
import { Ifluxo } from '../interfaces/Ifluxo';
import Eval from './eval';
import fs from 'fs'
export default async function (cliente: Iclient | any, fluxo: Ifluxo | any, bot: Ibot) {
    const { socket, sendText, reply, remoteJid } = bot
    let newFluxo = fluxo
    let questions: any = JSON.parse(fluxo.questions)
    let cFlux = 0;
   let finish=false;

    function iteract() {
        if (cFlux >= questions.length) {
            return
        }
        socket.sendMessage(`${cliente.numero}@s.whatsapp.net`, { text: Eval(cliente, questions[cFlux].pergunta) });

    }
    function contraria(answer?: any) {
        if (cFlux >= questions.length) {
            return

        }

        socket.sendMessage(`${cliente.numero}@s.whatsapp.net`, { text: Eval(cliente, questions[cFlux].contraria) });
        console.log(questions)
        cFlux = questions.length-1
    }

    iteract()
    socket.ev.on("messages.upsert", async (msg: any) => {
        const [webMessage] = msg?.messages;
        const id = webMessage.key.remoteJid
        if (!id) {
            return
        }
        if (cFlux >= questions.length) {

            return
        }

        let number = id.split('@')[0]
        if(finish){
            return
        }
        if (number == cliente.numero && !webMessage.key.fromMe) {
           
            if (questions[cFlux].contraria.length < 2 && finish==false) {

                let obj: any = { cliente: cliente.nome, dados: [] }
                questions.map((value: any) => {
                    if (value.nomeVar.length > 2) {
                        obj.dados.push({ pergunta: value.nomeVar, resposta: value.resposta })
                    }
                })
                finish=true
               return sendText(`respostas de ${obj.cliente}:\n ${obj.dados.map((x: any) => { return `🟢${x.pergunta}: ${x.resposta}\n\n` })}`.replace(/,/g, ''))
                

            }
            if (cFlux >= questions.length) {
                return contraria(webMessage.message?.conversation)
            }
            if (webMessage.message?.conversation.includes(questions[cFlux].possivelResposta)) {
                questions[cFlux].resposta = webMessage.message?.conversation

                cFlux++
                return iteract()
            } else {
                questions[cFlux].resposta = webMessage.message?.conversation
                return contraria()
            }


        }
    })

}