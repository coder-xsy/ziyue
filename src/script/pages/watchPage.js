import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import QuesTitle from '../../img/list.jpg';
import Dplayer from 'react-dplayer';
import PPtplayer from '../components/PPtplayer.js';
import PdfPlayer from '../components/PdfPlayer.js'

import QuesIcon from '../../img/ques.png';
import Myheader from '../containers/Myheader.js';
import LessonInf from '../components/LessonInf.js';
import Footer from '../containers/Footer.js';
import QuesList from '../containers/QuesList.js';
import lessonVideoCover from '../../img/image-01.jpg';
import '../../style/pages/watchPage.css';

export default class WatchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inf: {
                lessonName:'',
                lessonFrom:'',
                lessonDate:'',
                chapterTitle:''
            }
        };
        /**
         * inf:{
         *  lessonName,lessonFrom,lessonDate,chapterTitle
         * }
         */
    }
    componentDidMount() {
        /**获取课程信息 */
        const {lessonId,chapterId} = this.props.match.params;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/lessonIntro?lessonId=${lessonId}&chapterId=${chapterId}`,
            { method: 'GET' })
            .then(res => res.json())
            .then(response => {
                // console.log(response);
                this.setState({ inf: response.data });
            }
            );
    }

    toggleTime = (time) => {
        this.refs.dplayer.dp.seek(time);
    }

    renderPlayer() {
        //const { type } = this.state;
        const id = this.props.match.params.lessonId;
        switch (id) {
            case '111':
                return (
                    <Dplayer
                        ref="dplayer"
                        className="videoPlayer"
                        video={{
                            url: 'http://192.168.73.132/static.smartisanos.cn/common/video/t1-ui.mp4',
                            pic: lessonVideoCover
                        }}
                    />
                );
            case '222':
                return (
                    <PPtplayer />
                );
            case '333':
                return (
                    <PdfPlayer />
                );
            default:
                return ''
        }
    }

    render() {
        const { inf } = this.state;
        const {account,accountType,lessonId,chapterId}=this.props.match.params;
        return (
            <div className="watchPage">
                <Myheader account={account} accountType={accountType} history={this.props.history} />
                <div className="main">
                    <div className="content">
                        <div className="studystuff">
                            <div className="stuff">
                                <LessonInf inf={inf} />
                                {
                                    this.renderPlayer()
                                }
                                <div className="publishQues">
                                    <h2>
                                        <img src={QuesIcon} alt="quesIcon" />
                                        <span>提出疑问</span>
                                    </h2>
                                    <div className="quesForm">
                                        {/* <label>疑问：</label> */}
                                        <textarea className="quesInput" placeholder="我的疑问" />
                                        <button className="btn btn-primary btn-wide">提交</button>
                                    </div>
                                </div>
                            </div>
                            <div className="listContent col-md-3">
                                <img src={QuesTitle} className="quesTitle" alt="答疑集锦" />
                                <div className="headText">
                                    <span>时间</span>
                                    <span>问题</span>
                                    <span>发送时间</span>
                                </div>
                                <QuesList 
                                    account={account}
                                    accountType={accountType}
                                    lessonId={lessonId} 
                                    chapterId={chapterId}
                                />
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}
