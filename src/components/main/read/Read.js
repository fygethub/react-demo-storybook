import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Read extends Component {
    render(){
        const { match } = this.props;
        console.log(match);
        return (
            <div>Read<br />
                <Link to="/">main</Link></div>
        )
    }
}



export default Read;
