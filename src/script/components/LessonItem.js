import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jsCover from '../../img/lessonJS.jpg';
import vueCover from '../../img/vue.jpg';
import reactCover from '../../img/react.jpg';
import Arrow from '../../img/left.png';

import QuesItem from './QuesItem.js';

import '../../style/components/LessonItem.css';

export default class LessonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStatus: false,
            quesList: []
        };
        /**
         * item:{
         *  ques{quesText,quesId,chapterId,chapterTitle},
         *  ansHead:string
         * }
         */
    }

    getQuesList = () => {
        const { account, inf } = this.props;
        const { lessonId } = inf;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/student/qaList?account=${account}&lessonId=${lessonId}`,
            { method: 'GET' })
            .then(res => res.json())
            .catch(err => console.log('getQuesList error', err))
            .then(response => {
                if (response.status === 1) {
                    this.setState({ quesList: response.qaList });
                } else {
                    console.log('net ok ,but fail to get qalist');
                }
            });
    }

    handleToggle = () => {
        this.setState((preState, props) => {
            if (!preState.listStatus) {
                this.getQuesList();
            }
            return ({ listStatus: !preState.listStatus })
        });
    }

    render() {
        const { listStatus, quesList } = this.state;
        const { inf, account, accountType } = this.props;
        return (
            <div className="lessonItemBox">
                <div className="lessonItem">
                    <Link className="cover" to={`/student/${account}/lesson/${inf.lessonId}`}>
                        <img src={inf.lessonId==='111'?jsCover:(inf.lessonId==='222'?vueCover:reactCover)} alt="cover" />
                    </Link>
                    <div className="lessonText">
                        <div className="lessonMessage">
                            <p className="lessonName">{inf.lessonName}</p>
                            {/* <p><span className="lessonRate">{`${inf.lessonRate}%`}</span><span className="lessonRateTitle" >{inf.lessonRateTitle}</span></p> */}
                            <p><span className="lessonRateTitle" >{`学到：${inf.chapterTitle}`}</span></p>
                            <p className="quesToggle" >
                                <span>{`问答：${inf.quesCount}`}</span>
                                <img src={Arrow} onClick={this.handleToggle} className={`arrow ${listStatus ? 'arrowDown' : 'arrowUp'}`} alt="arrow" />
                            </p>
                        </div>
                        <Link className="mylink" to={`/${this.props.accountType}/${this.props.account}/watchpage/${inf.lessonId}/${inf.chapterId}`}><button className="btn btn-primary myLinkBtn">继续学习</button></Link>
                    </div>
                </div>
                <div className={`quesList ${listStatus ? 'quesListDown' : 'quesListUp'}`}>
                    <ol>
                        {
                            quesList.length === 0 ? "no ques" : quesList.map((item, index) => (
                                <QuesItem
                                    key={index}
                                    account={account}
                                    accountType={accountType}
                                    lessonId={inf.lessonId}
                                    ques={item.ques}
                                    ans={item.ansHead}
                                    index={index}
                                />
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}