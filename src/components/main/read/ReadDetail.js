import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PureRender from 'tools/decorators';
import { getReadDetail } from 'reduxs/action';
import Dialog from 'material-ui/Dialog';
import ReturnButton from 'commont/ReturnButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Badge from 'material-ui/Badge';
import { IconMenu, IconSetUp, IconMessage,IconHome } from '../../FontIcons';
import 'styles/readDetail.css'



@PureRender
class ReadDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            isShowHeader: false,
            isShowFooter: false,
            isShowFooterSetUp: false,
            fontSize:1,
            valueSelect:'default',
        }
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSelectList = this.handleSelectList.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleClickSetUp = this.handleClickSetUp.bind(this);
        this.handleAddFontSize = this.handleAddFontSize.bind(this);
        this.handleClickAssess = this.handleClickAssess.bind(this);
        this.handleDownFontSize = this.handleDownFontSize.bind(this);
        this.handleClickContainer = this.handleClickContainer.bind(this);
    }


    componentDidMount() {
        const { match } = this.props;
        match.params && this.props.getReadDetail(match.params.id);
    }

    handleSelectList(e) {
        let i = 0;
        while (!e.target.dataset.id && i < 5){
            e.target = e.target.parentNode;
            i++;
        }
        this.props.history.push('/readDetail/' + encodeURIComponent(e.target.dataset.id));
        this.props.getReadDetail(e.target.dataset.id);
        this.setState({
            open:false,
            isShowHeader: false,
            isShowFooter: false,
        })
    }

    handleClickContainer() {
        this.setState({
            isShowHeader:!this.state.isShowHeader,
            isShowFooter: !this.state.isShowFooter,
            isShowFooterSetUp: false
        })

    }

    handleAddFontSize() {
        let size = this.state.fontSize + 0.1 -0;
        if(size >= 2){
            return ;
        }else {
            this.setState({
                fontSize:size
            })
        }
    }

    handleDownFontSize() {
        let size = this.state.fontSize - 0.1 -0;
        if(size <= 0.8){
            return ;
        }else {
            this.setState({
                fontSize:size
            })
        }
    }

    handleRadioChange(e, value){
        this.setState({
            valueSelect:value
        })
    }

    handleClickSetUp(e) {
        e.stopPropagation();
        this.setState({
            isShowFooterSetUp: true
        })
    }

    handleClickMenu(e){
        e.stopPropagation();
        this.setState({open: true});
    }

    handleClickAssess(e){
        e.stopPropagation();
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render(){
        const { readDetail } = this.props;
        let hideStyleHeader = {
            transform:'translateY(-100%)'
        };
        let styleInit = {
            transform:'translateY(0%)'
        }
        let hideStyleFooter = {
            transform:'translateY(100%)'
        }
        let fontColor = '#a0a064',background:'whitesmoke';
        fontColor = this.state.valueSelect === 'default' ? 'gray' : (this.state.valueSelect === 'light' ? '#000' : '#a0a064');
        background = this.state.valueSelect === 'default' ? 'whitesmoke' : (this.state.valueSelect === 'light' ? '#ffffff' : '#000');
        if(readDetail && this.props.readDetail.title){
            return (<div className="readDetailContainer" onClick={this.handleClickContainer}>
                        <div className="readDetailHeader" style={this.state.isShowHeader ? styleInit: hideStyleHeader }>
                            <ReturnButton color="var(--default-color)" {...this.props} />
                            <Link to="/" style={{padding:'1rem'}}><IconHome /></Link>
                        </div>
                        <div className="readDetailContent">
                            <h2 style={{fontSize:this.state.fontSize + 'rem',color:fontColor,background:background}}>{this.props.readDetail.title}</h2>
                            <p style={{fontSize:this.state.fontSize + 'rem',color:fontColor,background:background}}>
                                {this.props.readDetail.cpContent ? this.props.readDetail.cpContent : this.props.readDetail.body}
                            </p>
                        </div>
                        <div className="readDetailFooter" style={this.state.isShowFooter? styleInit : hideStyleFooter}>
                            <dl onClick={this.handleClickMenu} >
                                <dd>
                                    <IconMenu />
                                </dd>
                                <dt>
                                    目录
                                </dt>
                            </dl>
                            <dl onClick={this.handleClickSetUp }>
                                <dd>
                                    <IconSetUp />
                                </dd>
                                <dt>设置</dt>
                            </dl>
                            <dl onClick={this.handleClickAssess }>
                                <dd>
                                    <Badge
                                        badgeContent={3}
                                        primary
                                        style={{padding: '2px 21px 1px 1px',transform:'translateX(22%) scale(.9)',transformOrigin:'50% 50%'}}
                                    >
                                        <IconMessage />
                                    </Badge>
                                </dd>
                                <dt>
                                    章评
                                </dt>
                            </dl>
                        </div>
                        <div
                            className="readDetailFooter"
                            style={ this.state.isShowFooterSetUp ? styleInit : hideStyleFooter}
                            onClick={(e)=> e.stopPropagation()}
                        >
                            <div className="changeFontSize">
                                <FlatButton onTouchTap={this.handleDownFontSize}>A - </FlatButton>
                                <FlatButton onTouchTap={this.handleAddFontSize}>A + </FlatButton>
                            </div>
                            <div className="changeBackground">
                                <RadioButtonGroup
                                    name="shipSpeed"
                                    defaultSelected="default"
                                    onChange={this.handleRadioChange}
                                >
                                    <RadioButton
                                        value="default"
                                        label="默认"
                                        style={{width:'8rem'}}
                                    />
                                    <RadioButton
                                        value="light"
                                        label="明亮"
                                        style={{width:'8rem'}}
                                    />
                                    <RadioButton
                                        value="dark"
                                        label="护眼"
                                        style={{width:'8rem'}}
                                    />
                                </RadioButtonGroup>
                            </div>
                        </div>
                        <Dialog
                            title="目录章节"
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            autoScrollBodyContent
                        >
                            <div className="readDetailMenuLis">
                            {
                                this.props.chaptersList && this.props.chaptersList.chapters && this.props.chaptersList.chapters.chapters &&
                                    this.props.chaptersList.chapters.chapters.map((chapter,i)=>
                                        <li key={i} className="chapterList" onClick={(e)=>this.handleSelectList(e)} data-id={chapter.link} >
                                            <a>
                                                <span>{chapter.title}</span>
                                            </a>
                                        </li>
                                    )

                            }
                        </div>

                        </Dialog>
                    </div>);
        }

        return (
            <div>正在加载数据。。。</div>
        )
    }
}


const mapStateToProps = (state) => ({
    readDetail:state.readDetail,
    chaptersList: state.chaptersList
})

const mapDispatchToProps = (dispatch) => ({
    getReadDetail:(id)=> dispatch(getReadDetail(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(ReadDetail);














