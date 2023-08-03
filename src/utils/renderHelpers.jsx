import { myMessagesError, codeMessageError, myMessagesAction } from "./helpers";
import { notification } from "antd";

export const renderError = async (error, section, action) => {
  const message = error?.code
    ? await codeMessageError(error.code, section, action)
    : myMessagesError(section, action);
  notification.config({ theme: "light" });
  notification["error"]({ message });
};

export const renderMessageAction = async (
  section,
  action,
  type,
  message = undefined
) => {
  notification.config({ theme: "light" });
  notification[type || "success"]({
    message: message || myMessagesAction(action, section),
  });
};
