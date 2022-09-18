import mongoose from "../db";

const FluxoSchema = new mongoose.Schema(
  {
    titulo:String,
    questions: String,
    
  },
  { collection: "fluxo" }
);
export default FluxoSchema;
