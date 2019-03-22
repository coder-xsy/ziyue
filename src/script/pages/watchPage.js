import React, { Component } from 'react';
//import { Navbar, Nav, Form, Button, Col, Row } from 'react-bootstrap';
import Dplayer from 'react-dplayer';
import Header from '../containers/Header.js';
import LessonInf from '../components/LessonInf.js';
import PPtplayer from '../components/PPtplayer.js';
import Footer from '../containers/Footer.js';
import QuesList from '../containers/QuesList.js';
import lessonVideoCover from '../../img/image-01.jpg';
import '../../style/pages/watchPage.css';

export default class WatchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inf: null,
            danmu:null
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
        // console.log(this.refs.dplayer);
    }

    toggleTime = (time) => {
        this.refs.dplayer.dp.seek(time);
    }

    danmuloaded = () => {
        this.setState({
            danmu:this.refs.dplayer.dp.danmaku.dan
        });
    }

    test = () => {
        console.log('test')
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
                        <QuesList />
                        <Dplayer
                            ref="dplayer"
                            className="videoPlayer"
                            onDanmaku_loaded = { this.test }
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
                <PPtplayer />
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
