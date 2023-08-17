import { create } from "zustand";

import { INotification } from "../types/notification";

type NotificationProps = {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
  clearByIndex: (index: number) => void;
  clearAll: () => void;
};

export const useNotificationStore = create<NotificationProps>((set) => ({
  notifications: [],
  addNotification: (notification: INotification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  clearByIndex: (index: number) =>
    set((state) => ({ notifications: state.notifications.slice(index, -1)})),
  clearAll: () => set({ notifications: [] }),
}));
