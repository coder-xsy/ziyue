import React, { Component } from 'react';
import TempCover from '../../img/lessonJS.jpg';
import Arrow from '../../img/left.png';

import '../../style/components/LessonItem.css';

export default class LessonItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            listStatus:false
        }
    }

    handleToggle = () => {
        this.setState((preState,props) => ({listStatus:!preState.listStatus}));
    }

    render() {
        const { listStatus } = this.state;
        return (
            <div className = "lessonItemBox">
                <div className="lessonItem">
                    <img src={TempCover} className="cover" alt="cover" />
                    <div className="lessonMessage">
                        <p className="lessonTitle">JavaScript入门教程</p>
                        <p><span className="lessonRate">已学:20%</span><span className="lessonRateTitle" >学习至:2-1 原型链的继承</span></p>
                        <p className="quesToggle" >
                            <span>问答: 2</span>
                            <img src={Arrow} onClick = {this.handleToggle} className={`arrow ${listStatus?'arrowDown':'arrowUp'}`} alt="arrow" />
                        </p>
                    </div>
                    <button className="study">继续学习</button>
                </div>
                <div className={`quesList ${listStatus?'quesListDown':'quesListUp'}`}>
                    <ol>
                        <li>
                            <label>1、</label>
                            <p>问:原型链的作用？&nbsp;&nbsp;&nbsp;&nbsp;所在章节:2-1 原型链的继承</p>
                            <p>答:原型链的作用可以使JavaScript中可以实现对象的继承</p>
                        </li>
                        <li>
                            <label>2、</label>
                            <p>
                                问:后台服务中有个长连接，在程序在后台运行时，长连接connect lost(服务没有挂掉)，
                                导致频繁重连。但是连接usb的时候，长连接就不会被断开。请问这个问题 是什么个情况？
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                所在章节:2-1 原型链的继承
                            </p>
                            <p>
                                答:原型链的作用可以使JavaScript中可以实现对象的继承
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
        );
    }
}