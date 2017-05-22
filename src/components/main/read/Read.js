import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PureRender from 'tools/decorators';
import { getChpters } from 'reduxs/action';
import { IconMessage, IconHome } from '../../FontIcons'
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import ReturnButton from 'commont/ReturnButton';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import 'styles/chapterList.css';
import 'styles/animate.css';


@PureRender
class Read extends Component {

    componentDidMount() {
        let { match } = this.props;
        this.props.getChpters(match.params.id);
        this.handleClickLi = this.handleClickLi.bind(this);
    }

    componentWillReceiveProps(nextprops){
        //let chapters = this.props.chaptersList;
        //console.log(nextprops);
    }

    handleClickLi(id) {
        this.props.history.push('/readDetail/'+ id);
    }

    render(){
        let chapters = this.props.chaptersList.chapters ? this.props.chaptersList.chapters : [];

        if(chapters.chapters && chapters.chapters.length > 0){

            return (<div>
                        <AppBar
                            title="章节列表"
                            titleStyle={{textAlign:'center',fontSize:'1.5rem',paddingRight:'1rem'}}
                            iconElementLeft={<ReturnButton history={this.props.history} color="var(--gray-dark)" />}
                            iconElementRight={ <Link to="/" style={{padding:'.6rem',display:'inline-block'}}><IconHome /> </Link>}
                        />
                    <ReactCssTransitionGroup
                        transitionName="fadeIn"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppearTimeout={300}
                        transitionAppear
                    >
                        <div className="chapterContainer">
                                <ul className="chapterUl">
                                    {

                                        chapters.chapters.map((chapter,i)=>
                                            <li key={i} className="chapterList" onClick={()=> this.handleClickLi(encodeURIComponent(chapter.link))}>
                                                <a><span>{chapter.title}</span></a>
                                                <div className="limessage">
                                                    <Badge
                                                        primary
                                                        badgeContent={~~(Math.random()*10)}
                                                        style={{top:0,left:0,padding:'0rem 0.6rem 0rem 0.4rem '}}
                                                        badgeStyle={{width:'1rem',height:'1rem'}}
                                                    >
                                                        <IconMessage />
                                                    </Badge>

                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                    </ReactCssTransitionGroup>
                        </div>
            );
        }else{
            return (<div className="chapterContainer">
                        <AppBar
                            title="章节列表"
                            titleStyle={{textAlign:'center',fontSize:'1.5rem',paddingRight:'1rem'}}
                            iconElementLeft={<ReturnButton history={this.props.history} color="var(--default-color)" />}
                            iconElementRight={ <Link to="/" style={{padding:'.6rem',display:'inline-block'}}><IconHome /> </Link>}
                        />
                    </div>
            );
        }

    }
}

const mapStateToProps = (state) => ({
    chaptersList: state.chaptersList
})

const mapDispatchToProps = (dispatch) => ({
    getChpters:(id)=> dispatch(getChpters(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(Read);
