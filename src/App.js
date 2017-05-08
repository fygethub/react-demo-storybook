import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Routes from './router/Routers'
import darkBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/reset.css';

/*引用tap事件适配移动端*/
injectTapEventPlugin();

class App extends Component {

  /*material-ui 需要配置主题才可以使用*/
  getChildContext() {
      return { muiTheme: getMuiTheme(darkBaseTheme) };
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

App.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default App;
