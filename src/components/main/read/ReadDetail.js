import React, { Component } from 'react';
import { connect } from 'react-redux';
import PureRender from 'tools/decorators';
import { getReadDetail } from 'reduxs/action';
import ReturnButton from 'commont/ReturnButton';
import Badge from 'material-ui/Badge';
import { IconMenu, IconSetUp, IconMessage } from '../../FontIcons';
import RaisedButton from 'material-ui/RaisedButton';
import 'styles/readDetail.css'



@PureRender
class ReadDetail extends Component {

    componentDidMount() {
        const { match } = this.props;
        match.params && this.props.getReadDetail(match.params.id);
    }

    render(){
        const { readDetail } = this.props;
        if(readDetail && this.props.readDetail.title){
            return (<div className="readDetailContainer">
                        <div className="readDetailHeader">
                            <ReturnButton color="var(--default-color)" />
                        </div>
                        <div className="readDetailContent">
                            <h2>{this.props.readDetail.title}</h2>
                            <p>
                                {this.props.readDetail.body}
                            </p>
                        </div>
                        <div className="readDetailFooter">
                            <dl>
                                <dd>
                                    <IconMenu />
                                </dd>
                                <dt>
                                    目录
                                </dt>
                            </dl>

                            <dl>
                                <dd>
                                    <IconSetUp />
                                </dd>
                                <dt>设置</dt>
                            </dl>

                            <dl>
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
                    </div>);
        }

        return (
            <div>正在加载数据。。。</div>
        )
    }
}


const mapStateToProps = (state) => ({
    readDetail:state.readDetail,
})

const mapDispatchToProps = (dispatch) => ({
    getReadDetail:(id)=> dispatch(getReadDetail(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(ReadDetail);














