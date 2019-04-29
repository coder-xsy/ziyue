import React, { Component } from 'react';
import '../../style/pages/person.css';
import LessonBox from '../containers/LessonBox.js';
import LessonPublished from '../containers/LessonPublished.js';
import Footer from '../containers/Footer.js';
import Save from '../../img/save.png';
import Edit from '../../img/edit.png';
import HeadImg from '../../img/boy.jpg';
export default class Person extends Component{
    constructor(props){
        super(props);
        this.state={ 
            accountType:this.props.match.params.accountType,//'student', // student or teacher
            pageType:'lessons',  //lessons or personInf
            editStatus:false,
            account:this.props.match.params.account,
            email:'2586574619@qq.com',
            password:'1111111',
            headImg:'111'
        };
    }

    getPerson = () => {
        const account = this.props.match.params.account;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getPersonInf?account=${account}`,
        {method:'GET'})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(response => {
            if(response.status===1){
                this.setState({
                    pageType:'personInf',
                    email:response.inf.email,
                    password:response.inf.password,
                    headImg:response.inf.headImg
                });
            }else{
                console.log('error on get personInf');
            }
        });
    }

    setPerson = () => {
        const {email,account,password} = this.state;
        fetch('http://yapi.demo.qunar.com/mock/63878/ziyue/setPersonInf',
            {method:'POST',body:JSON.stringify({email,account,password})})
            .then(res=>res.json())
            .catch(err=>console.log('post personInf',err))
            .then(response=>{
                if(response.status===1){
                    this.setState({editStatus:false});
                }else{
                    console.log('set Personinf error');
                }
            });
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
                    <button onClick = { this.setPerson }>
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
        const { accountType, account } = this.state;
        return accountType === 'student' ? (<LessonBox account={account} />) : (<LessonPublished />);
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
                            onClick = {this.getPerson} 
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