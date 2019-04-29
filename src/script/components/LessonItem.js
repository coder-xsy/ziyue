import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TempCover from '../../img/lessonJS.jpg';
import Arrow from '../../img/left.png';

import QuesItem from './QuesItem.js';

import '../../style/components/LessonItem.css';

export default class LessonItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            listStatus:false,
            quesList:[
                // {
                //     ques:{
                //         quesId:'123',
                //         content:"原型链的作用",
                //         lessonId:"111",
                //         lessonRate:20,
                //         lessonTitle:"2.1、原型链的继承"
                //     },
                //     ans:"每个函数都有自己的执行环境。当执行流进入一个函数时函数的环境就会被推入一个环境栈中,当执行流进入一个函数时函数的环境就会被推入一个环境栈中,当执行流进入一个函数时函数的环境就会被推入一个环境栈中"
                // },
                // {
                //     ques:{
                //         quesId:'123',
                //         content:"原型链的作用",
                //         lessonId:"111",
                //         lessonRate:20,
                //         lessonTitle:"2.1、原型链的继承"
                //     },
                //     ans:"每个函数都有自己的执行环境。当执行流进入一个函数时函数的环境就会被推入一个环境栈中"
                // }
            ]
        }
    }

    getQuesList = () => {
        const { account, inf } = this.props;
        const { lessonId } = inf;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/student/qaList?account=${account}&lessonId=${lessonId}`,
            {method:'GET'})
            .then(res=>res.json())
            .catch(err=>console.log('getQuesList error',err))
            .then(response => {
                if(response.status===1){
                    this.setState({quesList:response.qaList});
                }else{
                    console.log('net ok ,but fail to get qalist');
                }
            });
    }

    handleToggle = () => {
        this.setState((preState,props) => {
            if(!preState.listStatus){
                this.getQuesList();
            }
            return ({listStatus:!preState.listStatus})
        });
    }

    render() {
        const { listStatus, quesList } = this.state;
        const { inf } = this.props;
        return (
            <div className = "lessonItemBox">
                <div className="lessonItem">
                    <img src={TempCover} className="cover" alt="cover" />
                    <div className="lessonMessage">
                        <p className="lessonTitle">{inf.lessonName}</p>
                        <p><span className="lessonRate">{inf.lessonRate}</span><span className="lessonRateTitle" >{inf.lessonRateTitle}</span></p>
                        <p className="quesToggle" >
                            <span>{`问答：${inf.quesCount}`}</span>
                            <img src={Arrow} onClick = {this.handleToggle} className={`arrow ${listStatus?'arrowDown':'arrowUp'}`} alt="arrow" />
                        </p>
                    </div>
                    <Link className="study" to={`/watchpage/${inf.lessonId}`}>继续学习</Link>
                </div>
                <div className={`quesList ${listStatus?'quesListDown':'quesListUp'}`}>
                    <ol>
                        {/* <li>
                            <label>1、</label>
                            <p>问:原型链的作用？&nbsp;&nbsp;&nbsp;&nbsp;所在章节:2-1 原型链的继承</p>
                            <p>答: </p>
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
                        </li> */}
                        {
                            quesList.length===0?"no ques":quesList.map((item,index)=>(
                                <QuesItem ques={item.ques} ans={item.ans} index={index} />
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}