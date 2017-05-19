import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import 'styles/search.css';
import AppBar from 'material-ui/AppBar';
import BookListItem from './BookListItem';
import PureRender from 'tools/decorators';
import ReturnButton from 'commont/ReturnButton';
import RecommendAndHistory from './RecommendAndHistory';
import AutoCompleteClassWrap from './AutoCompleteClassWrap';
import { removeHistory, getBookList,autoComplete,receiveBookLongIntro} from 'reduxs/action';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import 'styles/chapterList.css';
import 'styles/animate.css';

@PureRender
class Search extends Component {
    render(){
       let len = this.props.bookList &&
           this.props.bookList.length ;
       //判断输入框是否为'',为空就显示历史记录和推荐列表
        return (
            <div>
                <AppBar
                    titleStyle={{display:'none'}}
                    children={<AutoCompleteClassWrap />}
                    iconElementLeft={<ReturnButton history={this.props.history} />}
                />
                <ReactCssTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionAppearTimeout={500}
                    transitionAppear
                >
                    <div className="bookListContainer">
                        {len > 0? <SearchBookList {...this.props} />
                            : <RecommendAndHistory {...this.props} />}
                    </div>
                </ReactCssTransitionGroup>
            </div>
        )
    }
}

/*查询列表*/
class SearchBookList extends Component{

    render(){
        const { bookList, onFetchBookIntro } = this.props;
        return (
            <ul>
                {/*<BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />
                 <BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />*/}
                {bookList.map((book,i) =>
                    <BookListItem key={i} {...this.props} item={{
                        bookId:book._id,
                        imgUrl:book.cover,
                        hTitle:book.title,
                        subTitle: book.lastChapter,
                        retentionRatio:book.retentionRatio,
                        shortIntro:book.shortIntro,
                        author: book.author,
                        onFetchBookIntro: onFetchBookIntro
                    }}
                    />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) =>({
    bookList: state.bookList.books,
    autoInputName: state.autoBookList.name,
    historyList: state.historyList,
    otherSearch:['狼与兄弟','那些热血飞扬的日子','男人不低头',
        '罪恶之城','万道成神','人间鬼事','超级学生','欲望森林'],
});

const mapDispatchToProps = (dispatch) => ({
    onRequestDelete: (name) => {
        dispatch(removeHistory(name));
    },
    onSearchBook: (name) => {
        dispatch(getBookList(name));
        dispatch(autoComplete(name));
    },
    onFetchBookIntro: (id) =>{
        dispatch(receiveBookLongIntro(id));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Search)
