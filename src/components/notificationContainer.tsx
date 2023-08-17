import { useNotificationStore } from "../stores/notificationStore";
import Notification from "./notification";

const NotificationContainer = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  return (
    <>
      {notifications.map((notification, index) => (
        <Notification notification={notification} index={index} key={index} />
      ))}
    </>
  );
};

export default NotificationContainer;
