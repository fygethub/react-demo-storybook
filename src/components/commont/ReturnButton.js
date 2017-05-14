/**
 * Created by fydor on 2017/5/7.
 */
import React,{ Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
/*返回按钮*/
class ReturnButton extends Component{

    handleGoBack = ()=> {
        this.props.history.goBack();
    }

    render(){
        return (
            <IconButton
                style={{padding:'0'}}
                onTouchTap={this.handleGoBack}
            >
                {/*<Link to="/">*/}
                    <FontIcon
                        className="iconfont icon-fanhui"
                        color="var(--default-color)"
                    />
                {/*</Link>*/}
            </IconButton>
        )
    }
}

export default ReturnButton;