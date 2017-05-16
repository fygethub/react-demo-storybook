import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import Routes from './router/Routers'
import darkBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/reset.css';
// eslint-disable-next-line
import { addSearchHistory, removeHistory, receiveBookLongIntro} from './redux/action';
import Loading from './components/commont/Loading';
import store from './redux/store';

/*引用tap事件适配移动端*/
injectTapEventPlugin();

//store.dispatch(receiveBookLongIntro('57206c3539a913ad65d35c7b'));
store.dispatch(addSearchHistory());

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
