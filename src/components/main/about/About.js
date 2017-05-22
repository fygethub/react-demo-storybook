import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class About extends Component {
    render() {
        return (
            <div>
                <h3>fydor</h3>
                <p>
                    email:fydor@foxmail.com && fydor99@gmail.com
                </p>
                <p>
                    github主页： <a href="https://github.com/fygethub" target="_blank">https://github.com/fygethub</a>
                </p>
                <Link to="/">main</Link>
            </div>
        )
    }
}








