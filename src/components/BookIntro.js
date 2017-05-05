import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class BookIntro extends Component {
    render(){
        return (
            <div>
                BookIntro<br/>
                <Link to='/'>main</Link>
            </div>
        )
    }
}



export default BookIntro;
