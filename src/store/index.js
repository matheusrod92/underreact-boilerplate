import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as pack } from 'redux-pack';
import { createLogger } from 'redux-logger';

import amplitude from '../middlewares/amplitude';
import reducers from './reducers';

const middlewares = [thunk, pack, amplitude];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const store = preloadedState => createStore(
  reducers,
  preloadedState,
  applyMiddleware(...middlewares),
);

export default store;
