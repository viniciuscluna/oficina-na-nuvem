export interface INotification {
    type: "success" | "info" | "error";
    message: string;
    duration?: number;
  }
  