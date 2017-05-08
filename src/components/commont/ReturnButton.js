/**
 * Created by fydor on 2017/5/7.
 */
import React,{ Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
/*返回按钮*/
class ReturnButton extends Component{
    render(){
        return (
            <IconButton
                style={{padding:'0'}}
            >
                <Link
                    to="/"
                >
                    <FontIcon
                        className="iconfont icon-fanhui"
                        style={{'fontSize': '2rem','color':'var(--default-color)'}}
                    />
                </Link>
            </IconButton>
        )
    }
}

export default ReturnButton;