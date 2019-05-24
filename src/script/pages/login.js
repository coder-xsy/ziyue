import React,{ Component } from 'react';
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
                    <div className="col-lg-5 col-md-6 col-sm-8">
                        <LoginForm history = {this.props.history}/>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
