export const RECEIVE_MESSAGES_TRIGGER = "RECEIVE_MESSAGES_TRIGGER";
export const RECEIVE_MESSAGES_SUCCESS = "RECEIVE_MESSAGES_SUCCESS";
export const RECEIVE_MESSAGES_FAILURE = "RECEIVE_MESSAGES_FAILURE";

export const receiveMessagesTrigger = () => {
  return { type: RECEIVE_MESSAGES_TRIGGER };
};

export const receiveMessagesSuccess = messages => {
  return { type: RECEIVE_MESSAGES_SUCCESS, messages };
};

export const receiveMessagesFailure = error => {
  return { type: RECEIVE_MESSAGES_FAILURE, error };
};
