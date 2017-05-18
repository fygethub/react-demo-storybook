import React,{ Component } from 'react';
import Chip from 'material-ui/Chip';
import 'styles/search.css';


/*推荐列表*/
/* eslint-disable */
class RecommendAndHistory extends Component {
    render(){
        let style = {backgroundColor:"white",border:'1px solid var(--gray-lighter)'};
        let redStyle = {backgroundColor:"white",border:'1px solid var(--brand-danger)',color:'var(--brand-danger)'}
        return (
            <div className="recommend">
                <div className="h"><h3>大家都在搜</h3></div>
                <ul className="cards">
                    {/*<li>
                     <Chip
                     onTouchTap={()=>{}}
                     style={{backgroundColor:"white",border:'1px solid var(--gray-lighter)'}}
                     >狼与兄弟</Chip>
                     </li>*/}
                    {
                        this.props.otherSearch.map((name,i) =>(
                            <li key={i}>
                                <Chip
                                    onTouchTap={()=>{this.props.onSearchBook(name)}}
                                    labelStyle={i<=1 ? {color:'red'}: null}
                                    style={i<=1? redStyle: null}
                                >{name}</Chip>
                            </li>
                        ))
                    }
                </ul>
                <div className="searchHistory">
                    <div className="searchHistoryHead">
                        <a className="leftHead">搜索历史</a>
                        <a className="rightHead">清除历史</a>
                    </div>
                    <ul className="cards">
                        {
                            this.props.historyList.map((name,i)=> (
                                <li key={i}>
                                    <Chip
                                        onTouchTap={()=>{this.props.onSearchBook(name)}}
                                        onRequestDelete={() => this.props.onRequestDelete(name)}
                                    >{ name }</Chip>
                                </li>
                            ))
                        }
                        {/*<li>
                         <Chip
                         onRequestDelete={()=>{}}
                         >狼与兄弟</Chip>
                         </li>
                         */}
                    </ul>
                </div>
            </div>
        )
    }
}



export default RecommendAndHistory;