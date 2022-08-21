export interface Imenu {
  text: string;
  footer: string;
  templateButtons: {
    index: number;
    callButton?: { displayText: string };
    quickReplyButton?: { displayText: string };
  }[];
}
