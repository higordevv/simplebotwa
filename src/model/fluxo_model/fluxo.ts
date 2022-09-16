import { proto } from "@adiwajshing/baileys";
import mongoose from "../db";
import FluxoSchema from "./fluxoModel";



async function consult_fluxoMsg() {
    const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
    try {
      let data = await Fluxo.find({});

      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }


async function create_fluxo(msg: proto.IMessage | any) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");

  //.....
}

async function delete_msg(id: string) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  //.....
}


export {
    consult_fluxoMsg,
    create_fluxo,
    delete_msg,
}