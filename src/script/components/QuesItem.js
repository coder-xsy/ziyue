import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../style/components/QuesItem.css';
export default class QuesItem extends Component{
    render(){
        const { ques, ans, index,account,accountType,lessonId }=this.props;
        /**
         * ques{
         *      content,
         *      quesId
         *      chapterId,
         *      chapterTitle
         * } Object
         * ans  string
         */
        return(
            <li className="QAItem">
                <span className="index">{`${index}、`}</span>
                <p>
                    <span className="ques">问：{ques.quesText}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span title="查看所在课程"><Link className="myLink" to={`/${accountType}/${account}/watchPage/${lessonId}/${ques.chapterId}`}>{`所在章节:${ques.chapterTitle}`}</Link></span>
                </p>
                <p>
                    <span title="查看具体解答">答：<Link className="myLink" to={`/${accountType}/${account}/ansQues/${ques.quesId}`}>{ans}</Link></span>
                </p>
            </li>
        )
    }
}