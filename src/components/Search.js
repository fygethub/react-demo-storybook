import React, { Component } from 'react';
// eslint-disable-next-line
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import '../styles/search.css';
import ReturnButton from './commont/ReturnButton';
import AutoCompleteClassWrap from './AutoCompleteClassWrap';
import { Card } from 'material-ui/Card';

class Search extends Component {

    render(){
        const { bookList } = this.props;
        return (
            <div>
                <AppBar
                    titleStyle={{display:'none'}}
                    children={<AutoCompleteClassWrap />}
                    iconElementLeft={<ReturnButton />}
                />
                <div className="bookListContainer">
                    <ul>
                        {/*<BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />
                        <BookListItem item={{ imgUrl:'http://image.cmfu.com/books/3330580/3330580.jpg', hTitle:"Hello World", subTitle: "第二章"}} />*/}
                        {bookList.map((book,i) =>
                            <BookListItem key={i} item={{
                                    imgUrl:book.cover,
                                    hTitle:book.title,
                                    subTitle: book.lastChapter,
                                    retentionRatio:book.retentionRatio,
                                    shortIntro:book.shortIntro,
                                    author: book.author
                                }}
                            />
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}


/*搜索结果列表*/
class BookListItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <li className="bookListItem">
                <Card
                    containerStyle={{width:'100%'}}
                    style={{width:'100%'}}
                >
                    <div className="card-content">
                        <div>
                            <img src={item.imgUrl} alt="img" className="itemImg" />
                        </div>
                        <div className="bookIntro">
                            <h3>{item.hTitle}</h3>
                            <p className="subtitle ">
                               <span>{item.latelyFllower}人在追 |</span> <span>{item.retentionRatio}%读者留存 |</span> <span> {item.author}</span>
                            </p>
                        </div>
                    </div>
                    <p className="shortIntro">{item.shortIntro}</p>
                </Card>
            </li>
        )
    }
}

const mapStateToProps = (state) =>({
    bookList: state.bookList.books,
});

export default connect(mapStateToProps)(Search)
