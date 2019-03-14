import React, { Component } from 'react';
import { Navbar, Nav, Form, Button, Col, Row } from 'react-bootstrap';
import Dplayer from 'react-dplayer';
import AnsQuesItem from '../components/AnsQuesItem.js';
import LessonInf from '../components/LessonInf.js';
import Footer from '../containers/Footer.js';
import user from '../../img/user.png';
import ansLogo from '../../img/ansLogo.png';
import lessonVideoCover from '../../img/image-01.jpg';
import '../../style/pages/watchPage.css';

export default class WatchPage extends Component {
    constructor(props){
        super(props);
        this.state={
            inf:null
        };
    }
    componentDidMount(){
        fetch(`http://yapi.demo.qunar.com/mock/52554/lessonInf?lessonId=${this.props.match.params.id}`,
        {method:'GET'})
        .then(res => res.json())
        .then(response => {
                console.log(response);
                this.setState({inf:response});
            }
        );
    }
    render() {
        const { inf } = this.state;
        const lessonAd = inf ? {
            lessonName:inf.lessonName,
            lessonFrom:inf.lessonFrom,
            lessonDate:inf.lessonDate,
            lessonLocation:inf.lessonLocation
        } : false;
        return (
            <div>
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
                <div className="lesson">
                    <LessonInf inf = { lessonAd } />
                    <Dplayer
                        className="playerContainer"
                        video={{
                            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
                            pic: lessonVideoCover
                        }}
                        danmaku={{
                            id: 'e-ziyue@djlesson',
                            api: 'http://yapi.demo.qunar.com/mock/52554/'
                        }}
                    />
                </div>
                <div className="ansQues">
                    <div className="ansHead">
                        <img src={ansLogo} className="ansLogo" alt="问答专区" />
                        <h2 className="ansTitle">
                            问答
                        </h2>
                    </div>
                    <AnsQuesItem
                        inf={{
                            queUser: '李磊',
                            queTime: '02:33',
                            queDate: '2019-02-03',
                            que: '在这个视频中两分33秒的时候那几句日语是啥意思呢？',
                            ansUser: '前端大大老师',
                            ansTime: '02:33',
                            ansDate: '2019-03-01',
                            ans: '空气中氤氲这浪漫的气息，如溶解在红茶中的白糖一般'
                        }} 
                    />
                    <AnsQuesItem
                        inf={{
                            queUser: '李磊',
                            queTime: '02:33',
                            queDate: '2019-02-03',
                            que: '在这个视频中两分33秒的时候那几句日语是啥意思呢？',
                            ansUser: '前端大大老师',
                            ansTime: '02:33',
                            ansDate: '2019-03-01',
                            ans: '空气中氤氲这浪漫的气息，如溶解在红茶中的白糖一般'
                        }} 
                    />
                    <AnsQuesItem
                        inf={{
                            queUser: '李磊',
                            queTime: '02:33',
                            queDate: '2019-02-03',
                            que: '在这个视频中两分33秒的时候那几句日语是啥意思呢？',
                            ansUser: '前端大大老师',
                            ansTime: '02:33',
                            ansDate: '2019-03-01',
                            ans: '空气中氤氲这浪漫的气息，如溶解在红茶中的白糖一般'
                        }} 
                    />
                </div>
                <Footer />
            </div>
        );
    }
}
