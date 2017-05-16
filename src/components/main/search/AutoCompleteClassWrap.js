import React, { Component} from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';
import {receiveAutoComplete, getBookList,isShowLoading } from 'reduxs/action'
import PureRender from 'tools/decorators'


@PureRender
class AutoCompleteClass extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
        this.inputTimer = 0;
    }

    componentWillUnMount(){
        clearTimeout(this.inputTimer);
    }

    handleSearchAutoComplete = () => {
        const { dispatch } = this.props;
        dispatch(getBookList(this.props.searchText || this.state.searchText));
    }

    /*输入框延处理*/
    handleAutoSearchDelay = (time) => {
        const { dispatch } = this.props;
        this.inputTimer = setTimeout( () => {
            dispatch(receiveAutoComplete(this.state.searchText));
        },time);
    }

    handleUpdateInput = (value) => {
        this.setState({
            searchText: value
        })
        clearTimeout(this.inputTimer);
        this.handleAutoSearchDelay(350);
    }

    /*清空输入框*/
    handleClearInput = ()=>{
        const { dispatch } = this.props;
        this.setState({
            searchText: ''
        })
        dispatch(receiveAutoComplete(''))
        dispatch(getBookList(''));
    }


    render(){
        const { dataSource, dispatch } = this.props;
        return (
            <div className="autoComplete">
                <div className="autoCompleteSearchInput">
                    <AutoComplete
                        hintText="作者或者书名"
                        searchText={this.state.searchText || this.props.searchText}
                        dataSource={dataSource}
                        onUpdateInput={this.handleUpdateInput}
                        style={{width:'80%'}}
                        textFieldStyle={{width:'114%'}}
                        openOnFocus
                        menuCloseDelay={500}
                        onFocus={()=> {dispatch(isShowLoading(true))}}
                        onBlur={()=> {setTimeout(()=>dispatch(isShowLoading(false)),300)}}
                    />
                    <IconButton
                        onTouchTap={this.handleClearInput}
                    >
                        <FontIcon
                            className="iconfont icon-shanchu"
                            color="var(--default-color)"
                        />
                    </IconButton>
                </div>
                <IconButton
                    onTouchTap={this.handleSearchAutoComplete}
                >
                    <FontIcon
                        className="iconfont icon-sousu"
                    />
                </IconButton>
            </div>
        )
    }

}

const autoCompleteMapStateToProps = (state) => ({
    dataSource: state.autoBookList.lists || [],
    searchText: state.autoBookList.name || ''
})

const AutoCompleteClassWrap = connect(autoCompleteMapStateToProps)(AutoCompleteClass);
export default AutoCompleteClassWrap;