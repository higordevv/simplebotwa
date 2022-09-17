import mongoose from "../db";

const FluxoSchema = new mongoose.Schema(
  {
    questions: String,
    answers: String,
    variavel:String
  },
  { collection: "fluxo" }
);
export default FluxoSchema;
