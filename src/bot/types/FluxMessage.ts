export default interface FluxMessages {
  type: "decision" | "register" | "option" | "call";
  question: string;
  warking?: string;
  name: string;
  responses: string[] | undefined;
  errorMessage: FluxMessages[] | undefined;
  opt: { name: string; msg: FluxMessages[] }[] | undefined;
  media: { link: string; type: "doc" | "image" | "video" | "audio" };
}
