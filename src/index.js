import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import './styles/styles.scss';
import { startSetPosts } from './actions/posts'

const store = configureStore();


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
}

store.dispatch(startSetPosts()).then(() => {
    renderApp()
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
