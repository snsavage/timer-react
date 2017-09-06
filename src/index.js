import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactGA from 'react-ga';

import rootReducer from './reducers/root';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactGA.initialize('UA-106072204-1', { debug: true });

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter onUpdate={logPageView}>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
