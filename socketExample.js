// redux saga socket channel example
// to implement in future

import io from "socket.io-client";
import { eventChannel, delay } from "redux-saga";
import { take, call, put, fork, race, cancelled } from "redux-saga/effects";
import { createSelector } from "reselect";

const ADD_TASK = "ADD_TASK";
const START_CHANNEL = "START_CHANNEL";
const STOP_CHANNEL = "STOP_CHANNEL";
const CHANNEL_ON = "CHANNEL_ON";
const CHANNEL_OFF = "CHANNEL_OFF";
const SERVER_ON = "SERVER_ON";
const SERVER_OFF = "SERVER_OFF";

const socketServerURL = "http://localhost:3000";

const initialState = {
  taskList: [],
  channelStatus: "off",
  serverStatus: "unknown"
};

export default (state = initialState, action) => {
  const { taskList } = state;
  const updatedTaskList = [...taskList, action.payload];
  switch (action.type) {
    case CHANNEL_ON:
      return { ...state, channelStatus: "on" };
    case CHANNEL_OFF:
      return { ...state, channelStatus: "off", serverStatus: "unknown" };
    case ADD_TASK:
      return { ...state, taskList: updatedTaskList };
    case SERVER_OFF:
      return { ...state, serverStatus: "off" };
    case SERVER_ON:
      return { ...state, serverStatus: "on" };
    default:
      return state;
  }
};

// action creators for Stop and Start buttons. You can also put them into componentDidMount
export const startChannel = () => ({ type: START_CHANNEL });
export const stopChannel = () => ({ type: STOP_CHANNEL });

// sorting function to show the latest tasks first
const sortTasks = (task1, task2) => task2.taskID - task1.taskID;

// selector to get only first 5 latest tasks
const taskSelector = state => state.taskReducer.taskList;
const topTask = allTasks => allTasks.sort(sortTasks).slice(0, 5);
export const topTaskSelector = createSelector(taskSelector, topTask);

// wrapping functions for socket events (connect, disconnect, reconnect)
let socket;
const connect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("disconnect", () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("reconnect", () => {
      resolve(socket);
    });
  });
};

// This is how channel is created
const createSocketChannel = socket =>
  eventChannel(emit => {
    const handler = data => {
      emit(data);
    };
    socket.on("newTask", handler);
    return () => {
      socket.off("newTask", handler);
    };
  });

// connection monitoring sagas
const listenDisconnectSaga = function*() {
  while (true) {
    yield call(disconnect);
    yield put({ type: SERVER_OFF });
  }
};

const listenConnectSaga = function*() {
  while (true) {
    yield call(reconnect);
    yield put({ type: SERVER_ON });
  }
};

// Saga to switch on channel.
const listenServerSaga = function*() {
  try {
    yield put({ type: CHANNEL_ON });
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000)
    });
    if (timeout) {
      yield put({ type: SERVER_OFF });
    }
    const socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put({ type: SERVER_ON });

    while (true) {
      const payload = yield take(socketChannel);
      yield put({ type: ADD_TASK, payload });
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: CHANNEL_OFF });
    }
  }
};

// saga listens for start and stop actions
export const startStopChannel = function*() {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL)
    });
  }
};
