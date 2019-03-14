import React, { Component } from 'react';
import lessonCover from '../../img/lessonCover.jpg';
import '../../style/components/LessonInf.css';
export default class LessonInf extends Component {
    render() {
        const { lessonName, lessonFrom,
            lessonDate, lessonLocation } = this.props.inf;
        return (
            <div className = "lessonInf">
                <img className = "lessonCover" src = { lessonCover } alt = "cover" />
                <div className = "lessonText">
                    <h3>
                        <span>{ `课程名:${lessonName?lessonName:''}` }</span>
                        <span>{ `来源:${lessonFrom?lessonFrom:''}` }</span>
                        <span>{ `发布于${lessonDate?lessonDate:''}` }</span>
                    </h3>
                    <p className="videoLocation">
                        <span>当前视频:</span>
                        {
                            lessonLocation ? lessonLocation.map(
                                item=>(<span key = {item} >{`${item}>`}</span>)
                            ) : ""
                        }
                    </p>
                </div>
            </div>
        )
    }
}