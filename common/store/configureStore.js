import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from '../middleware/promiseMiddleware';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import DevTools from '../containers/DevTools';

let socket = io('http://localhost:3000'); //ADD BETTER SERVER
let socketIoMiddleware = createSocketIoMiddleware(socket, "SOCKET/");

const enhancer = compose(
  applyMiddleware(thunk, promiseMiddleware, socketIoMiddleware),
  DevTools.instrument()
);


const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
