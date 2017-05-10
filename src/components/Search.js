import React, { Component } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';
import '../styles/search.css';
import ReturnButton from './commont/ReturnButton';


class Search extends Component {

    render(){
        return (
            <div>
                <AppBar
                    titleStyle={{display:'none'}}
                    children={<AutoCompleteClass />}
                    iconElementLeft={<ReturnButton />}
                />
                <div>
                    <BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />
                    <BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />
                </div>
            </div>
        )
    }
}


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
                           <span>{subTitle}人在追 |</span> <span>0%读者留存 |</span> <span> 乔布斯著</span>
                        </p>
                    </div>
                </a>
            </li>
        )
    }
}


class AutoCompleteClass extends Component {
    state = {
        dataSource: [],
        searchText:''
    }

    handleUpdateInput = (value) => {
        this.setState({
            searchText:value,
            dataSource: [
                value,
                value + value,
                value + value + value
            ]
        })
    }

    handleClearInput = ()=>{
        this.setState({
            searchText:''
        })
    }
    render(){
        return (
            <div style={{display:'flex',justifyContent:'center',marginTop:'.5rem'}}>
                <AutoComplete
                    hintText="输入查询书籍"
                    searchText={this.state.searchText}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <IconButton
                    onTouchTap={this.handleClearInput}
                >
                    <FontIcon
                        className="iconfont icon-shanchu"
                        color="white"
                        style={{fontSize:'.55rem'}}
                    />
                </IconButton>
            </div>
        )
    }

}

export default Search;
