import React,{ Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../containers/LoginForm.js';
import Footer from '../containers/Footer.js';
import '../../style/pages/login.css';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render() {
        console.log('hashhistory:',this.props.history);
        return (
            <div className = "login">
                <div className = "content">
                    <Button className = "logo">子曰</Button>
                    <div>
                        <LoginForm history = {this.props.history}/>
                    </div>
                </div>
                {/* <h2>
                    <Link to ="/watchPage/02">react-bootstrap</Link>
                </h2> */}
                <Footer />
            </div>
        );
    }
}
