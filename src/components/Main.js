import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import '../styles/search.css';


export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRightMenuShow: false
        }
    }

    render(){
        return (
            <div>
                <AppBar
                    title="Material App"
                    titleStyle={{textAlign:'center',fontSize:'1.5rem'}}
                    iconStyleLeft={{display:'none'}}
                    iconElementRight={<VertMenu />}
                />
                <div>
                    <BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />
                    <BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />
                </div>
                <FlatButton>Search</FlatButton>
                <Link to="/search">search</Link>
                <br />
                <Link to="/about">about</Link>
                <br />
                <Link to="/read/2">read</Link>
                <br />
                <Link to="/bookIntro">bookIntro</Link>
                <br />
                <Link to="/changeOrigin">changeOrigin</Link>
            </div>
        )
    }
}


/*header 右侧的菜单组件*/

const VertMenu = (props) => (
    <div>

        <IconMenu
            {...props}
            iconButtonElement={
                <IconButton> <MoreVertIcon /> </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem primaryText="Refresh" />
            <Divider />
            <MenuItem
                primaryText="About"
                rightIcon={
                    <ArrowDropRight />
                }
                menuItems={[
                    <MenuItem primaryText="About Author" />,
                    <Divider />,
                    <MenuItem primaryText="About Material-UI" />
                ]}
            />
        </IconMenu>
    </div>

)
VertMenu.muiName = 'IconMenu';


/*搜索结果列表*/
class BookListItem extends Component {
    render() {
        const { item } = this.props;
        const { imgUrl, hTitle, subTitle } = item;
        return (
            <li className="bookListItem">
                <a>
                    <div>
                        <img src={imgUrl} alt="img" className="itemImg" />
                    </div>
                    <div className="bookIntro">
                        <h3>{hTitle}</h3>
                        <p className="subtitle">
                            {subTitle}
                        </p>
                    </div>
                </a>
            </li>
        )
    }
}
