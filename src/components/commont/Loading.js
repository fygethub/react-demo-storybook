import React from 'react';
import { connect } from 'react-redux';
import '../../styles/loading.css';

const Loading = ({ isLoading }) => {
    let show = isLoading ? (
        <div className="container">
            <div className="spinner">
                <div className="rect1" />
                <div className="rect2" />
                <div className="rect3" />
                <div className="rect4" />
                <div className="rect5" />
            </div>
        </div>
        ) : <span />
   return show;
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading
})

export default connect(mapStateToProps)(Loading);