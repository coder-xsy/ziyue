import React, { Component } from 'react';
import '../../style/containers/LoginForm.css';

export default class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            formType:'login',
            loginData:{
               account:'',
               password:'' 
            },
            registerData:{
                account:'',
                email:'',
                type:'',
                password:'',
                repassword:''
            }
        };
    }

    handleChange = (event) => {
        const { formType } = this.state;
        if(formType === 'login'){
            let updata = Object.assign({},this.state.loginData);
            updata[event.target.name] = event.target.value;
            this.setState({
                loginData:updata
            });
        }else if( formType === 'register' ){
            let updata = Object.assign({},this.state.registerData);
            updata[event.target.name] = event.target.value;
            this.setState({
                registerData:updata
            });
        }
    }
    choiceToggle = (type) => {
        let updata = Object.assign({},this.state.registerData,{ type });
        this.setState({
            registerData:updata
        });
    }

    activeLogin = () => {
        const { formType } = this.state;
        if(formType !== 'login'){
            this.setState({ 
                formType : 'login' 
            });
        }
    }

    activeRegister = () => {
        const { formType } = this.state;
        if(formType !== 'register'){
            this.setState({
                formType : 'register'
            });
        }
    }

    handleLogin = () => {
        const { loginData } = this.state;
        const { history } = this.props;
        if(loginData.account.length === 0||loginData.password.length === 0){
            alert('请输入用户名或密码');
        }else{
            fetch('http://yapi.demo.qunar.com/mock/52554/loginData',
            { method:'POST', body:JSON.stringify(loginData) })
            .then(res => res.json())
            .catch(err => console.log('loginErrorMessage:',err))
            .then(response => {
                if(response.loginStatus === 1){
                    //this.props.history.push('/watchPage/02');
                    //console.log('history:',this);
                    history.push('/person');
                }else{
                    console.log('loginDataPOST success,but error',response);
                }
            });
        } 
    }

    renderLogin = () => {
        const { loginData } = this.state;
        const { account, password } = loginData;
        return (
            <div className = "inputGroup">
                <input className = "inputItem" name = "account" type = "text" value = { account } placeholder = "用户名" onChange = { this.handleChange } />
                <input className = "inputItem" name = "password" type = "password" value = { password} placeholder = "密码" onChange = { this.handleChange } />
                <button className = "loginBtn" onClick = { this.handleLogin }>登录</button>
            </div>
        );
    }
    
    renderRegister = () => {
        const { registerData } = this.state;
        const { account, email, type, password, repassword } = registerData;
        return (
            <div className = "inputGroup">
                <input className = "inputItem" name = "account" type = "text" placeholder = "用户名 6~10位字母" value = { account } onChange = { this.handleChange } />
                <input className = "inputItem" name = "email" type="email" value = { email } placeholder = "邮箱" onChange = { this.handleChange } />
                <div className = "accountType">
                    <label className = {`choice ${type === 'student'? 'chosed':''}`} onClick = {() => {this.choiceToggle('student');}}>学生</label>
                    <label className = {`choice ${type === 'teacher'? 'chosed':''}`} onClick = {() => {this.choiceToggle('teacher');}}>教师</label>
                </div>
                <input className = "inputItem" name = "password" value = { password } placeholder = "密码 6~12位字母或数字" onChange = { this.handleChange } />
                <input className = "inputItem" name = "repassword" value = { repassword } placeholder = "确认密码" onChange = { this.handleChange } />
                <button className = "registerBtn">注册</button>
            </div>
        )
    }

    render(){
        const { formType }  = this.state;
        const inputGroup = formType === 'login' ? this.renderLogin() : this.renderRegister();
        return(
            <div className="formGroup">
                <div>
                    <span onClick = { this.activeLogin } className = {`toggleType ${ formType === 'login'? 'activeForm' : '' }`}>登录</span>
                    <span onClick = { this.activeRegister } className = {`toggleType ${ formType === 'register'? 'activeForm' : '' }`}>注册</span>
                </div>
                {
                    inputGroup
                }
            </div>
        );
    }
}