import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import user from '../../img/user.png';
import '../../style/components/Header.css';
export default class Header extends Component {
    render() {
        return (
            <Navbar className="topHead" expand="lg">
                <Navbar.Brand href='#/watchPage'>
                    <Button className="logo">子曰</Button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navBar' />
                <Navbar.Collapse id='navBar'>
                    <Form inline className="mr-auto">
                        <input type='text' placeholder='搜索' className='mr-sm-2 searchBox' />
                    </Form>
                    <Nav className="ml-auto userContainer">
                        <img src={user} alt='头像' width="28" height="28" />
                        <Nav.Link className="login" href="#/">登录</Nav.Link>
                        <Nav.Link className="register" href="#/">注册</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }
}