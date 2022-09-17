import { Ikeyword } from "../interfaces/Ikeyword"

export default function(txt:string){
if(!txt){return}
let formated=txt.split(",")
let answers=formated.slice(1,formated.length)

const keyword:Ikeyword={
    key_word:formated[0],
    answers
}
return keyword
}