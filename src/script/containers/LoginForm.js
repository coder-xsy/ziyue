import React, { Component } from 'react';
import '../../style/containers/LoginForm.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: 'login',
            loginData: {
                account: '',
                password: ''
            },
            registerData: {
                account: '',
                email: '',
                type: '',
                password: '',
                repassword: ''
            }
        };
    }

    handleChange = (event) => {
        const { formType } = this.state;
        if (formType === 'login') {
            let updata = Object.assign({}, this.state.loginData);
            updata[event.target.name] = event.target.value;
            this.setState({
                loginData: updata
            });
        } else if (formType === 'register') {
            let updata = Object.assign({}, this.state.registerData);
            updata[event.target.name] = event.target.value;
            this.setState({
                registerData: updata
            });
        }
    }
    choiceToggle = (type) => {
        let updata = Object.assign({}, this.state.registerData, { type });
        this.setState({
            registerData: updata
        });
        console.log(updata);
    }

    activeLogin = () => {
        const { formType } = this.state;
        if (formType !== 'login') {
            this.setState({
                formType: 'login'
            });
        }
    }

    activeRegister = () => {
        const { formType } = this.state;
        if (formType !== 'register') {
            this.setState({
                formType: 'register'
            });
        }
    }

    handleLogin = () => {
        const { loginData } = this.state;
        const { history } = this.props;
        if (loginData.account.length === 0 || loginData.password.length === 0) {
            alert('请输入用户名或密码');
        } else {
            fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/login?account=${loginData.account}`,
                { method: 'POST', body: JSON.stringify(loginData) })
                .then(res => res.json())
                .catch(err => console.log('loginErrorMessage:', err))
                .then(response => {
                    if (response.loginStatus === 1) {
                        console.log('login OK');
                        history.push(`/person/${response.accountType}/${loginData.account}/lessons`);
                    } else {
                        console.log('loginDataPOST success,but error', response);
                    }
                });
        }
    }

    handleRegister = () => {
        const { registerData } = this.state;
        const { account, email, type, password } = registerData;
        const { history } = this.props;
        console.log(registerData);
        if (Object.keys(registerData).some(item => registerData[item] === '')) {
            alert('请填写完整信息');
        } else {
            fetch('http://yapi.demo.qunar.com/mock/63878/ziyue/register',
                { method: 'POST', body: JSON.stringify({ account, email, type, password }) })
                .then(res => res.json())
                .catch(err => console.log('registerErrorMessage:', err))
                .then(response => {
                    if (response.registerStatus === 1) {
                        console.log('register OK');
                        history.push(`/person${registerData.type}/${registerData.account}/lessons`);
                    } else {
                        console.log('registerDataPOST success,but error', response);
                    }
                });
        }
    }

    render() {
        const { formType } = this.state;
        return (
            <div className="loginForm">
                <ul className="nav nav-tabs nav-append-content">
                    <li className={`${formType==='login'?'active':''}`} onClick={this.activeLogin}>登录</li>
                    <li className={`${formType==='register'?'active':''}`}onClick={this.activeRegister}>注册</li>
                </ul>
                <div className="tab-content">
                    <div className={`tab-pane ${formType === 'login' ? 'active' : ''}`}>
                        <div className="form-group has-feedback">
                            <input type="text" name="account"
                                value={this.state.loginData.account}
                                onChange={this.handleChange} placeholder="账号"
                                className="form-control"
                            />
                            <span className="form-control-feedback fui-user"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" name="password" value={this.state.loginData.password} onChange={this.handleChange} placeholder="密码" className="form-control" />
                            <span className="form-control-feedback fui-lock"></span>
                        </div>
                        <div className="operationBtn">
                            <button className="btn btn-primary" onClick={this.handleLogin}>登录</button>
                        </div>
                    </div>
                    <div className={`tab-pane ${formType === 'register' ? 'active' : ''}`}>
                        <div className="form-group has-feedback">
                            <input type="text" name="account" value={this.state.registerData.account}
                                onChange={this.handleChange} placeholder="注册账号" className="form-control"
                            />
                            <span className="form-control-feedback fui-user"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="email" name="email" value={this.state.registerData.email}
                                onChange={this.handleChange} placeholder="注册邮箱"
                                className="form-control"
                            />
                            <span className="form-control-feedback fui-mail"></span>
                        </div>
                        <div className="accountType">
                            <label className="radio" onClick={() => { this.choiceToggle('student'); }}>
                                <input type="radio" name="group1" value="1" />
                                学生
                            </label>
                            <label className="radio" onClick={() => { this.choiceToggle('teacher'); }}>
                                <input type="radio" name="group1" value="2" />
                                教师
                            </label>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" name="password" value={this.state.registerData.password}
                                onChange={this.handleChange} placeholder="密码"
                                className="form-control"
                            />
                            <span className="form-control-feedback fui-lock"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" name="repassword" value={this.state.registerData.repassword}
                                onChange={this.handleChange} placeholder="确认密码"
                                className="form-control"
                            />
                            <span className="form-control-feedback fui-lock"></span>
                        </div>
                        <div className="operationBtn">
                            <button className="btn btn-primary" onClick={this.handleRegister}>注册</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}