import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { IconHome,IconSearch } from './FontIcons/index'


class Bottom extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectIndex : 0
        }
    }

    select = (index) => this.setState({selectIndex: index});

    render() {
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
                        icon={<Link to="/search"><IconSearch /></Link>}
                        onTouchTap={()=> this.select(1)}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}


export default Bottom;























