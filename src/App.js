import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import Routes from './router/Routers'
import darkBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/reset.css';
import { receiveAutoComplete, getBookList} from './redux/action';
import Loading from './components/commont/Loading';
import store from './redux/store';

store.subscribe(() =>
    console.log(store.getState())
)

store.dispatch(receiveAutoComplete('he'));

setTimeout(function () {
    store.dispatch(receiveAutoComplete('大'));
},1000)

setTimeout(function () {
    store.dispatch(getBookList('hello world'));
},2000)


/*引用tap事件适配移动端*/
injectTapEventPlugin();

class App extends Component {

  /*material-ui 需要配置主题才可以使用*/
  getChildContext() {
      return { muiTheme: getMuiTheme(darkBaseTheme) };
  }

  render() {
    return (
        <Provider store={store}>
          <div className="App">
                <Loading />
                <Routes />
          </div>
        </Provider>
    );
  }
}

App.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default App;
