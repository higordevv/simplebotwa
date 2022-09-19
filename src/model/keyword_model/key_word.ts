import mongoose from "../db";
import KeyWordSchemma from "./keywordModel";
import { Ikeyword } from "../../interfaces/Ikeyword";

async function read_keyWord() {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "keyword");
  try {
    let data = await KeyWord.find({});
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
async function sch_keyWord(name: string) {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "keyword");
  try {
    let data = await KeyWord.findOne({ key_word: name });
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}
async function create_keyWord(keyword: Ikeyword | any) {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "keyword");
  try {
    const key_word = new KeyWord(keyword);
    await key_word.save();
    console.log("[!] keyword criada");
    return true;
  } catch (err) {
    console.log("Erro no mongo");
    return null;
  }
}

async function delete_keyWord(name: string) {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "keyword");
  let data = await KeyWord.findOne({ key_word: name });
  if (data != null) {
    await KeyWord.deleteOne({ _id: data.id });
    return true;
  } else {
    return null;
  }
}

export { read_keyWord, create_keyWord, delete_keyWord, sch_keyWord };
