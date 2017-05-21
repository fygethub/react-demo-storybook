import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import ReturnButton from 'commont/ReturnButton';
import Share from 'commont/Share';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from 'commont/Loading';
import PureRender from 'tools/decorators';
import { calcUpdateTime,urlChange }from 'tools';
import { receiveBookLongIntro} from 'reduxs/action';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import 'styles/animate.css';
import 'styles/bookIntro.css'



@PureRender
class BookIntro extends Component {

    componentDidMount() {
        const { match } = this.props;
        this.props.onFetchBookIntro(match.params.id);
    }

    render(){
        let bookLongIntro = this.props.bookLongIntro;
        if(!bookLongIntro){
            return (
                <div>
                    <AppBar
                        title="书籍详情"
                        style={{textAlign:'center'}}
                        iconElementLeft={<ReturnButton history={this.props.history} color="var(--default-color)" />}
                        iconElementRight={<Share />}
                        iconStyleRight={{marginTop:'1rem'}}
                    />
                    <Loading />
                </div>
            )
        }
        const {
            title,
            author,
            wordCount,
            minorCate,
            updated,
            cover,
            _id,
            latelyFollower,
            retentionRatio,
            serializeWordCount,
            longIntro,
            tags
        } = bookLongIntro;

        let tags_ = tags.length > 0 ? tags.map((tag,i)=> (
            <FlatButton style={{margin:'.5rem',backgroundColor:`rgba(${i*10 <= 255 ? 255-i*10 : 255},${i*20 <= 255 ? i*20 : 255},${i*30 <= 255 ? 155-i*30 : 255},.45)` }} key={i} rippleColor="deepPink" hoverColor="white">{tag}</FlatButton>
        )): <FlatButton rippleColor="deepPink" hoverColor="white">其他</FlatButton>
        return (
            <div>
                <AppBar
                    title="书籍详情"
                    style={{textAlign:'center'}}
                    iconElementLeft={<ReturnButton history={this.props.history} color="var(--default-color)" />}
                    iconElementRight={<Share />}
                    iconStyleRight={{marginTop:'1rem'}}
                />
                <ReactCssTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionAppearTimeout={500}
                    transitionAppear
                >
                <div className="bookIntroContent">
                    <nav className="bookNav">
                        <aside className="imgDiv"><img src={urlChange(cover)} alt="" /></aside>
                        <section className="imgIntro">
                            <h3>{title}</h3>
                            <p className="introFont">
                                <b className="font-red">{author}</b><span>| {minorCate} | {~~(wordCount/10000)}万字</span><br />
                                <span className="font-grey-light">{calcUpdateTime(updated)}更新</span>
                            </p>
                        </section>
                    </nav>
                    <div className="buttons">
                        <div className="button-container">
                            <RaisedButton
                                primary
                                fullWidth
                            ><i className="iconfont icon-guanbi" />不追了</RaisedButton>
                        </div>
                        <div className="button-container">
                            <RaisedButton
                                primary
                                fullWidth
                            ><Link to={'/read/'+_id}><i className="iconfont icon-llalbumdiggbtn" />开始阅读 </Link>
                            </RaisedButton>
                        </div>
                    </div>
                    <section className="detailIntro">
                        <dl>
                            <dd><span>追书人数</span></dd>
                            <dt><span>{latelyFollower}</span></dt>
                        </dl>
                        <dl>
                            <dd><span>读者留存率</span></dd>
                            <dt>{retentionRatio}%</dt>
                        </dl>
                        <dl>
                            <dd><span>日更新字数</span></dd>
                            <dt>{serializeWordCount}</dt>
                        </dl>
                    </section>
                    <article>
                        <header>
                            {tags_}
                        </header>
                        <pre>
                            {longIntro}
                        </pre>
                    </article>
                </div>
                </ReactCssTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bookLongIntro: state.bookLongIntro.bookIntro
})

const mapDispatchToProps = (dispatch) => ({
    onFetchBookIntro: (id) =>{
        dispatch(receiveBookLongIntro(id));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(BookIntro);
