import React, { Component } from 'react';
//import { Navbar, Nav, Form, Button, Col, Row } from 'react-bootstrap';
import Dplayer from 'react-dplayer';
import Header from '../containers/Header.js';
// import AnsQuesItem from '../components/AnsQuesItem.js';
import LessonInf from '../components/LessonInf.js';
// import PPtplayer from '../components/PPtplayer.js';
import Footer from '../containers/Footer.js';
import Hidden from '../../img/right.png';
import Show from '../../img/left.png';
// import ansLogo from '../../img/ansLogo.png';
import lessonVideoCover from '../../img/image-01.jpg';
import '../../style/pages/watchPage.css';

export default class WatchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inf: null,
            qlistState:0
        };
    }
    componentDidMount() {
        fetch(`http://yapi.demo.qunar.com/mock/52554/lessonInf?lessonId=${this.props.match.params.id}`,
            { method: 'GET' })
            .then(res => res.json())
            .then(response => {
                //console.log(response);
                this.setState({ inf: response });
            }
            );
    }
    handleSlideR = ()=>{
        this.setState({
            qlistState:2
        })
        console.log('aaaaaaaaa');
    } 

    handleSlideL = ()=>{
        this.setState({
            qlistState:1
        })
    }
    render() {
        const { inf } = this.state;
        const lessonAd = inf ? {
            lessonName: inf.lessonName,
            lessonFrom: inf.lessonFrom,
            lessonDate: inf.lessonDate,
            lessonLocation: inf.lessonLocation
        } : false;
        return (
            <div>
                <Header />
                <div className="lesson">
                    <LessonInf inf={lessonAd} />
                    <div className="playerContainer">
                        <div 
                        className={`listContainer ${this.state.qlistState===0?""
                        :this.state.qlistState===1?'aniSlideLeft':'aniSlideRight'}`}>
                            <div className="list">
                                <img width="48px" className="hidden" onClick={this.handleSlideR} src={ Hidden } alt = "hidden" />
                                <img width="48px" className="show" onClick={this.handleSlideL} src={ Show } alt = "show" />
                                <h2>问题列表</h2>
                            </div>
                        </div>
                        <Dplayer
                            className="videoPlayer"
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

                </div>
                {/* <PPtplayer /> */}
                {/* <div className="ansQues">
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
                </div> */}
                <Footer />
            </div>
        );
    }
}
