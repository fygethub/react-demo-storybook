import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { IconHome,IconSearch, IconRead } from '../FontIcons/index'


class Bottom extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectIndex : 0
        }
    }

    select = (index) => {
        this.setState({selectIndex: index});
       setTimeout(function () {
           index === 1 && this.props.history.push(`/search`);
       }.bind(this),300)
        setTimeout(function () {
            index === 2 && this.props.history.push(`/read/1${index}`);
        }.bind(this),300)
    }

    render() {
        /* eslint-disable */
        return (
            <Paper zDepth={1} style={{}}>
                <BottomNavigation selectedIndex={this.state.selectIndex}>
                    <BottomNavigationItem
                        label="home"
                        icon={<Link to="/"><IconHome /></Link>}
                        onTouchTap={()=> this.select(0)}
                    />
                    <BottomNavigationItem
                        label="search"
                        icon={<IconSearch />}
                        onTouchTap={()=> this.select(1)}
                    />
                    <BottomNavigationItem
                        label="read"
                        icon={<IconRead />}
                        onTouchTap={()=> this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}


export default Bottom;























