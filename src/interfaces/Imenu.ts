export interface Imenu {
  caption: string;
  footer: string;
  templateButtons: {
    index: number;
    callButton?: { displayText: string };
    quickReplyButton?: { displayText: string };
  }[];
}
