import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const NotFound = ({ match }) => {

    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    return (
        <div className="page-wraper">
            <Header />

            <div className="page-content">

                <div className="section-full content-inner-2 shop-account">

                    <div className="container">
                        <div className="text-center" style={{ minHeight: '300px' }}>
                            <h1 style={{ lineHeight: '300px', textTransform: 'uppercase' }}>404 not found</h1>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />

        </div >
    )
}

export default NotFound;