import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../style/components/Header.css';
export default class Header extends Component {
    render() {
        return (
            <div className="topHead">
                <div>
                    <Button className="logo">子曰</Button>
                    <input type='text' placeholder='搜索' className='mr-sm-2 searchBox' />
                </div>
                <p><Link className="mylink" to='/login'>登录/注册</Link></p>
            </div>
        );

    }
}