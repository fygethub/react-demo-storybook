import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import 'styles/share.css';


class Share extends Component {
    handleClick = (e) => {
        e.preventDefault();
        alert('share');
    }

    render() {
        return(
            <FlatButton
                onTouchTap={this.handleClick}
                className="share"
            >
                <span>分享</span>
            </FlatButton>
        )
    }
}

export default Share;

