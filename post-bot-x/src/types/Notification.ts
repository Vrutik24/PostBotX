export interface Notification {
  id?:string;  
  userEmail: string;
  userId: string;
  createdOn: Date;
  collectionId: string;
  collectionName: string;
  senderName: string;
}
