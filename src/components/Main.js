import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Main extends Component {
    render(){
        return (
            <div>
                <Link to='/search'>search</Link>
                <br/>
                <Link to='/about'>about</Link>
                <br/>
                <Link to='/read/2'>read</Link>
                <br/>
                <Link to='/changeOrigin'>changeOrigin</Link>
            </div>
        )
    }
}




