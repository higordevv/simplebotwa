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
    let finish = false;
    let contrariaAnsw = false
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
        contrariaAnsw = true;
        //cFlux = questions.length - 1
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
        if (finish) {
            return
        }
        if (number == cliente.numero && !webMessage.key.fromMe) {
            const message = webMessage.message.conversation || webMessage.message.extendedTextMessage?.text
            if (questions[cFlux].contraria.length < 2 && finish == false) {
                cFlux = questions.length
                let obj: any = { cliente: cliente.nome, dados: [] }
                questions.map((value: any) => {
                    if (value.nomeVar.length > 2) {
                        obj.dados.push({ pergunta: value.nomeVar, resposta: value.resposta })
                    }
                })
                finish = true
                return sendText(`respostas de ${obj.cliente}:\n${cliente.numero} \n${obj.dados.map((x: any) => { return `🟢${x.pergunta}: ${x.resposta}\n\n` })}`.replace(/,/g, ''))


            }
            if (contrariaAnsw == true) {
                questions[cFlux].resposta = message
                cFlux = questions.length - 1
                contrariaAnsw = false
                return iteract()
            }
            let complex = questions[cFlux].possivelResposta.split(',')
            let inclue = false
            complex.map((value: any) => {
                if (message.includes(value)) {
                    inclue = true
                }
            })
            if (inclue) {
                questions[cFlux].resposta = message

                cFlux++
                return iteract()
            } else {
                console.log(`${cliente.nome} - ${message}`)
                questions[cFlux].resposta = message
                return contraria()
            }


        }
    })

}