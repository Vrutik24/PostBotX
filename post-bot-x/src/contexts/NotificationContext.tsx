import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { firestore } from "../firebase";
import { Notification } from "../types";

// Define the structure of the NotificationContext value
interface NotificationContextType {
  getAllNotification: () => Promise<Notification[]>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function useNotification(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationContextProvider({
  children,
}: NotificationProviderProps): JSX.Element {
  const { currentUser } = useAuth();

  const getAllNotification = async (): Promise<Notification[]> => {
    try {
      if (!currentUser) {
        throw new Error("Login to see your notifications");
      }
      const notificationQuery = query(
        collection(firestore, "Notification"),
        where("userEmail", "==", currentUser.email)
      );
      const notificationsSnapshot = await getDocs(notificationQuery);

      const notifications: Notification[] = notificationsSnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return {
            id : doc.id,
            userEmail: data.userEmail,
            userId: data.userId,
            createdOn: data.createdOn,
            collectionId: data.collectionId,
            collectionName: data.collectionName,
            senderName: data.senderName,
          } as Notification;
        }
      );

      return notifications;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const value: NotificationContextType = {
    getAllNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
