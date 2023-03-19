import FluxMessage from "./FluxMessage";

export default interface Flux {
  id_user?: string;
  title?: string;
  first_message?: string;
  last_message?: string;
  messages: FluxMessage[];
}
