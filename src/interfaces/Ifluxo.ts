export interface Ifluxo {
    titulo: string
    questions?: {
        pergunta: string,
        possivelResposta?: string,
        resposta?: string,
        contraria:string,
        nomeVar:string
    }[],
}