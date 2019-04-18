import React, { Component } from 'react';
import '../../style/pages/person.css';
import LessonBox from '../containers/LessonBox.js';
import Footer from '../containers/Footer.js';
import Save from '../../img/save.png';
import Edit from '../../img/edit.png';
import HeadImg from '../../img/boy.jpg';
export default class Person extends Component{
    constructor(props){
        super(props);
        this.state={
            pageType:'lessons',  //lessons or personInf
            editStatus:false,
            account:'coderxsy',
            email:'2586574619@qq.com',
            password:'1111111',
        };
    }
    
    handleChange = (event) => {
        let value ={};
        value[event.target.name] = event.target.value;
        this.setState(value);
    }

    renderPersonInf = () => {
        const { editStatus, account, email, password } = this.state;
        return (
            <div className = "personInfBox">
            <div className = "headImgBox">
                <img className = "headImg" src = { HeadImg } alt = "头像" />
                <label for = "headImgFile">
                    <img src = { Edit } className = "icon"  alt = "icon" />
                    <span>
                        更换头像
                    </span>
                </label>
                <input className = "headImgFile" id="headImgFile" type = "file" accept = '.jpg,.png,.svg'/> 
            </div>
            <div className = "infBox">
                <p>
                    <label className = "label">账号:</label>
                    <input type = "text" className = 'editInf' name = "account" value = {account} disabled={!editStatus} 
                        onChange = { this.handleChange } 
                    />
                </p>
                <p>
                    <label className = "label">邮箱:</label>
                    <input type = "text" className = 'editInf' name = "email" value = {email} disabled={!editStatus} 
                        onChange = { this.handleChange } 
                    />
                </p>
                <p>
                    <label className = "label">密码:</label>
                    <input type = "password" className = 'editInf' name = "password" value = {password} disabled={!editStatus} 
                        onChange = { this.handleChange } 
                    />
                </p>
                <p>
                    <button onClick = { () => {this.setState({ editStatus:true });} }>
                        <img src = { Edit } className = "icon"  alt = "icon" />
                        <span>
                            修改
                        </span>
                    </button>
                    <button onClick = { () => {this.setState({ editStatus:false });} }>
                        <img src = { Save } className = "icon"  alt = "icon" />
                        <span>
                           保存
                        </span>
                    </button> 
                </p>
            </div>
        </div>
        );
    }
    
    renderLessons = () => {
        return (
            <LessonBox />
        )
    }

    render(){
        const { pageType } = this.state;
        return(
            <div className = "person">
                <div className = "head">
                    <button className="logo">
                        子曰
                    </button>
                    <div className = "toggleBox">
                        <span 
                            onClick = {() => {this.setState({pageType:'lessons'});}} 
                            className = {`toggleBtn ${pageType === 'lessons' ? 'active' : ''}` }
                        >课程</span>
                        <span 
                            onClick = {() => {this.setState({pageType:'personInf'});}} 
                            className = {`toggleBtn ${pageType === 'personInf' ? 'active' : ''}`}
                        >个人中心</span>
                    </div>
                </div>
                <div className = "content">
                    {pageType === "personInf" ? this.renderPersonInf() : this.renderLessons()}
                </div>
                <Footer />
            </div>
        );
    }
}