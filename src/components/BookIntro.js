import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import ReturnButton from './commont/ReturnButton';
import Share from './commont/Share';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/bookIntro.css'

class BookIntro extends Component {
    render(){
        return (
            <div>
                <AppBar
                    title="书籍详情"
                    style={{textAlign:'center'}}
                    iconElementLeft={<ReturnButton />}
                    iconElementRight={<Share />}
                    iconStyleRight={{marginTop:'1rem'}}
                />
                <nav className="bookNav">
                    <aside className="imgDiv"><img src="http://image.cmfu.com/books/1003247636/1003247636.jpg" alt="" /></aside>
                    <section className="imgIntro">
                        <h3>马前卒</h3>
                        <p className="introFont">
                            <b className="font-red">枪手一号</b><span>| 架空历史 | 252万字</span><br />
                            <span className="font-grey-light">8小时前更新</span>
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
                        ><i className="iconfont icon-llalbumdiggbtn" />开始阅读</RaisedButton>
                    </div>
                </div>
                <section className="detailIntro">
                    <dl>
                        <dd><span>追书人数</span></dd>
                        <dt><span>9304</span></dt>
                    </dl>
                    <dl>
                        <dd><span>读者留存率</span></dd>
                        <dt>9304</dt>
                    </dl>
                    <dl>
                        <dd><span>日更新字数</span></dd>
                        <dt>6209</dt>
                    </dl>
                </section>
                <article>
                    <header>
                        <FlatButton rippleColor="deepPink" hoverColor="white">历史</FlatButton>
                    </header>
                    <p>
                        不停地战斗，不停的杀敌，秦风是国家的悍将，军队的马前卒，永远冲锋在第一线，用赫赫战功书写着自己光荣的履历，但大变陡至，昔日的功臣，转眼之间却成了国家的罪人，人人得而诛之的叛徒，兄弟血洒疆场，部下反目成仇，情人苦恋虐心，一时之间，四面楚歌。这位昔日的国之悍将身份反转，开始了为自己而活的人生，揭开了一段昔日马前卒，后世开国君的波澜壮阔的人生。
                        不停地战斗，不停的杀敌，秦风是国家的悍将，军队的马前卒，永远冲锋在第一线，用赫赫战功书写着自己光荣的履历，但大变陡至，昔日的功臣，转眼之间却成了国家的罪人，人人得而诛之的叛徒，兄弟血洒疆场，部下反目成仇，情人苦恋虐心，一时之间，四面楚歌。这位昔日的国之悍将身份反转，开始了为自己而活的人生，揭开了一段昔日马前卒，后世开国君的波澜壮阔的人生。
                    </p>
                </article>
            </div>
        )
    }
}

export default BookIntro;
