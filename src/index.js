import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './store/createStore';
import SearchPage from './pages/searchPage';
import thunk from 'redux-thunk';

const theme = createMuiTheme({
    
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <SearchPage/>
                </MuiThemeProvider>
            </Provider>
        
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
