import React, { Component } from 'react';
import { connect } from 'react-redux';
import PureRender from 'tools/decorators';
//import { Link } from 'react-router-dom';
import { getChpters } from 'reduxs/action';
import { IconMessage } from '../../FontIcons'
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
    }

    componentWillReceiveProps(nextprops){
        //let chapters = this.props.chaptersList;
        //console.log(nextprops);
    }

    render(){
        let chapters = this.props.chaptersList.chapters ? this.props.chaptersList.chapters : [];

        if(chapters.chapters && chapters.chapters.length > 0){

            return (<div>
                        <AppBar
                            title="章节列表"
                            titleStyle={{textAlign:'center',fontSize:'1.5rem',paddingRight:'1rem'}}
                            iconElementLeft={<ReturnButton history={this.props.history} color="var(--gray-dark)" />}
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
                                            <li key={i} className="chapterList">
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
