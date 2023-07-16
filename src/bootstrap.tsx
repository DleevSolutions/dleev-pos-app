import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@store';
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// Mount function to start up the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

serviceWorkerRegistration.register();
