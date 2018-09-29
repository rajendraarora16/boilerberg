import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'seamless-immutable';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const dev = process.env.NODE_ENV !== 'production';
const windowExist = typeof window === 'object';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  dev && windowExist && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

/* eslint-enable */
export function configureStore(initialState = {}) {
  /* eslint-disable no-param-reassign */
  if (!Immutable.isImmutable(initialState)) initialState = Immutable(initialState);

  /* eslint-enable */
  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

/**
 * Run the root saga initially
 */
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.runSagaTask()
  return store;
}

export default configureStore;
