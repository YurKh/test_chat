import {
  RECEIVE_MESSAGES_TRIGGER,
  RECEIVE_MESSAGES_SUCCESS,
  RECEIVE_MESSAGES_FAILURE
} from "../actions/messages";

const initialState = {
  receivingMessages: false,
  receivedMessages: true,
  messages: [],
  messagesError: ""
};

const MessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGES_TRIGGER:
      return {
        ...state,
        receivingMessages: true,
        receivedMessages: false,
        messagesError: ""
      };
    case RECEIVE_MESSAGES_SUCCESS:
      return {
        ...state,
        receivingMessages: false,
        receivedMessages: true,
        messages: action.messages
      };
    case RECEIVE_MESSAGES_FAILURE:
      return {
        ...state,
        receivingMessages: false,
        receivedMessages: false,
        messagesError: action.error
      };

    default:
      return state;
  }
};

export default MessagesReducer;
