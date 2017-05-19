import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import Routes from './router/Routers'
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/reset.css';
// eslint-disable-next-line
import { addSearchHistory, removeHistory, receiveBookLongIntro,getChpters} from './redux/action';
import Loading from './components/commont/Loading';
import store from './redux/store';

/*引用tap事件适配移动端*/
injectTapEventPlugin();

//store.dispatch(receiveBookLongIntro('57206c3539a913ad65d35c7b'));
//store.dispatch(addSearchHistory());
//store.dispatch(getChpters('577b477dbd86a4bd3f8bf1b2'));

class App extends Component {

  /*material-ui 需要配置主题才可以使用*/
  getChildContext() {
      return { muiTheme: getMuiTheme(lightBaseTheme) };
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
