import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../../style/components/searchQuestion.css";
export default class SearchQuestion extends Component {
    render() {
        const { account, accountType,
            quesText, quesId, person, time,
            lesson, lessonId, chapter, chapterId } = this.props;
        return (
            <Link to={`/student/${account}/ansQues/${quesId}`} className="searchQuestion" title="查看详情">
                <p className="question">
                    <span>问题：</span><span>{quesText}</span>
                </p>
                <p className="quesPerson">
                    <span>{`提问人：${person}`}</span>
                    <span>{`提问时间：${time}`}</span>
                </p>
                <p className="quesLesson">{`所属课程：${lesson}>${chapter}`}</p>
            </Link>
        )
    }
}