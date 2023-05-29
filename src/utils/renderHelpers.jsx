import { myMessagesError, codeMessageError, myMessagesAction } from "./helpers";
import { notification } from "antd";

export const renderError = async (error, typeError, action) => {
  const message = error?.code
    ? await codeMessageError(error.code, typeError, action)
    : myMessagesError(typeError, action);
  notification["error"]({ message });
};

export const renderMessageAction = async (
  action,
  section,
  type,
  message = undefined
) => {
  notification[type || "success"]({
    message: message || myMessagesAction(action, section),
  });
};
