import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/root';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
