export interface Message {
  id: string;
  senderUserId: string;
  senderUsername: string;
  senderPhotoUrl: string;
  recipientUserId: string;
  recipientUsername: string;
  recipientPhotoUrl: string;
  content: string;
  dateRead: Date;
  messageSent: Date;
}
