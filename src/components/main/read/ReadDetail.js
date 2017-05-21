import React, { Component } from 'react';
import { connect } from 'react-redux';
import PureRender from 'tools/decorators';
import { getReadDetail } from 'reduxs/action';

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
                        <div className="readDetailHeader" />
                        <div className="readDetailContent">
                            <h2>{this.props.readDetail.title}</h2>
                            <p>
                                {this.props.readDetail.body}
                            </p>
                        </div>
                        <div className="readDetailFooter" />
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














