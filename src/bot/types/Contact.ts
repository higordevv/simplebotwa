import Message from "./Messages";

export default interface Contact {
  isGroup: boolean;
  name?: string | null;
  picture?: string | null;

  msgs?: Message[];
  id?: string | null;
}
