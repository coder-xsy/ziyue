import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Dplayer from 'react-dplayer';
import PPtplayer from '../components/PPtplayer.js';
import PdfPlayer from '../components/PdfPlayer.js'

import Header from '../containers/Header.js';
import LessonInf from '../components/LessonInf.js';
import Footer from '../containers/Footer.js';
import QuesList from '../containers/QuesList.js';
import lessonVideoCover from '../../img/image-01.jpg';
import '../../style/pages/watchPage.css';

export default class WatchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'video',
            inf: null,
            danmu: null
        };
    }
    componentDidMount() {
        /**获取课程信息 */
        fetch(`http://yapi.demo.qunar.com/mock/52554/lessonInf?lessonId=${this.props.match.params.id}`,
            { method: 'GET' })
            .then(res => res.json())
            .then(response => {
                //console.log(response);
                this.setState({ inf: response });
            }
            );
    }

    toggleTime = (time) => {
        this.refs.dplayer.dp.seek(time);
    }

    renderPlayer() {
        const { type } = this.state;
        switch (type) {
            case 'video':
                return (
                    <Dplayer
                        ref="dplayer"
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
                );
            case 'ppt':
                return (
                    <PPtplayer />
                );
            case 'pdf':
                return (
                    <PdfPlayer />
                );
            default:
                return ''
    }
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
                        <QuesList toggleTime={this.toggleTime} lessonId={this.props.match.params.id} />
                        {
                            this.renderPlayer()
                        }
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
                <div className="toggleShow">
                    <Button onClick = { () => {this.setState({type:'video'})} } >videoPlayer</Button>
                    <Button onClick = { () => {this.setState({type:'ppt'})} }>PPtplayer</Button>
                    <Button onClick = { () => {this.setState({type:'pdf'})} }>pdfPlayer</Button>
                </div>
                <Footer />
            </div>
        );
    }
}
