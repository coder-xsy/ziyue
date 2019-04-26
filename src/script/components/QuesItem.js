import React, { Component } from 'react';
import Link from 'react-router-dom';

import '../../style/components/QuesItem.css';
export default class QuesItem extends Component{
    render(){
        const { ques, ans, index }=this.props;
        /**
         * ques{
         *      content,
         *      lessonId,
         *      lessonRate,
         *      lessonTitle
         * } Object
         * ans  string
         */
        return(
            <li className="QAItem">
                <span className="index">{`${index}、`}</span>
                <p>
                    <span>问：{ques.content}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>所在课程：</span>
                    <span title="查看所在课程"><Link to={`/watchPage/${ques.lessonId}?rate=${ques.lessonRate}`}>{ques.lessonTitle}</Link></span>
                </p>
                <p>
                    <span title="查看具体解答">答：<Link to={`/ansQues/${ques.lessonId}`}>{ans}</Link></span>
                </p>
            </li>
        )
    }
}