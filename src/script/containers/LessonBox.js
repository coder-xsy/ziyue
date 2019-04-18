import React, { Component } from 'react';
import LessonItem from '../components/LessonItem.js';

import '../../style/containers/lessonBox.css';

export default class lessonBox extends Component{
    constructor(props){
        super(props);
        this.state={
            type:'all',
            lessonList:[
                {
                    lessonId:'1234645789',
                    lessonName:'JavaScript入门教程',
                    cover:'img',
                    lessonRate:20,
                    lessonRateTitle:'2-1 原型链的继承',
                    quesCount:2
                },
                {
                    lessonId:'1234645789',
                    lessonName:'JavaScript入门教程',
                    cover:'img',
                    lessonRate:20,
                    lessonRateTitle:'2-1 原型链的继承',
                    quesCount:2
                }
            ]
        }
    }

    render(){
        const { type } = this.state;
        return (
            <div className = "lessonBox">
                <div className = "typeChose">
                    <span 
                        className = { `${type === 'all' ? "active" : ""}`} 
                        onClick = {() => {this.setState({type:'all'});}} 
                    >所有课程</span>
                    <span 
                        className = { `${type === 'studying' ? "active" : ""}` }
                        onClick = { () => {this.setState({type:'studying'});} }
                    >学习中</span>
                    <span 
                        className = { `${type === 'studied' ? "active" : ""}` } 
                        onClick = { () => {this.setState({type:'studied'});} }
                    >已完成</span>
                </div>
                <LessonItem />
                <LessonItem />
            </div>
        );
    }
}