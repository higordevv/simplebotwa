//modules
import fs from 'fs'
import path from 'path'
//funções
import { downloadContentFromMessage, proto } from "@adiwajshing/baileys";

export async function downloadDocumentmessage(contentMsg: proto.Message.IDocumentMessage) {
    
    const filename = ``
    const filetype = contentMsg.mimetype?.split('/')[1]
   try{

       let stream = await downloadContentFromMessage(contentMsg, "document");
      
    
       let buffer = Buffer.from([])
       for await (const chunk of stream) {
         
           buffer = Buffer.concat([buffer, chunk])
       }
    
       try {
           await fs.writeFileSync(path.resolve('temp', `${filename}.${filetype}`), buffer)
          
           return path.resolve('temp', `${filename}.${filetype}`)
       
       } catch (err) {
           console.log(`erro ao escrever arquivo:\n ${err}`)
           return null
       }
   }
   catch(err){
    console.log('erro no stream \n'+err)
    return null}
}