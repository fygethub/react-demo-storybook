import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import 'styles/search.css';

/*搜索结果列表*/
class BookListItem extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /*这里换成箭头函数不知道为什么this指向不对*/
    handleClick(e) {
        e.stopPropagation();
        this.props.item.onFetchBookIntro( this.props.item.bookId);
        setTimeout(() => {
            this.props.history.push('bookIntro');
        },500);
    }

    render() {
        const { item } = this.props;
        return (
            <li className="bookListItem">
                <a to="/bookIntro"
                      onClick={this.handleClick}
                >
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
                </a>
            </li>
        )
    }
}

export default BookListItem;