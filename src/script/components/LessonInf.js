import React, { Component } from 'react';
import lessonCover from '../../img/lessonCover.jpg';
import { Row, Col } from 'react-bootstrap';
import '../../style/components/LessonInf.css';
export default class LessonInf extends Component {
    render() {
        const { lessonName, lessonFrom,
            lessonDate, lessonLocation } = this.props.inf;
        return (
            <Row className = "lessonInf">
                <Col lg="2" xl="2" md="2" sm="4" xs="6">
                    <img className = "lessonCover" src = { lessonCover } alt = "cover" />
                </Col>
                <Col lg="10" xl="10" md="10" sm="8" xs="12" className = "lessonText">
                    <h3>
                        <span>{ `课程名:${lessonName?lessonName:''}` }</span>
                        <span>{ `来源:${lessonFrom?lessonFrom:''}` }</span>
                        <span>{ `发布于${lessonDate?lessonDate:''}` }</span>
                    </h3>
                    <p className="videoLocation">
                        <span>当前视频:</span>
                        {
                            lessonLocation ? lessonLocation.map(
                                (item,index,arr)=>(<span key = {item} >{`${item}${index===arr.length-1?"":">"}`}</span>)
                            ) : ""
                        }
                    </p>
                </Col>
            </Row>
        )
    }
}