import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Search extends Component {

    render(){
        const { match } = this.props;
        console.log(match);
        return (
            <div>Search<br/>
                <Link to='/'>main</Link>
            </div>
        )
    }
}



export default Search;
