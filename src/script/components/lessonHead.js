import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MyModal from "./MyModal.js";
import jsCover from '../../img/lessonJS.jpg';
import vueCover from '../../img/vue.jpg';
import reactCover from '../../img/react.jpg';
import nodeCover from '../../img/node.jpg';
import '../../style/components/lessonHead.css';

export default class LessonHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStatus: false,
            lessonName: '',
            studentNum: '',
            cover: '',
            intro: ''
        }
    }

    componentDidMount() {
        const { lessonId } = this.props;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getLessonHead?lessonId=${lessonId}`, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.status === 1) {
                    this.setState(response.data);
                } else {
                    console.log('get lesson head error');
                }
            })
    }

    getCover = (id) => {
        switch (id) {
            case "111":
                return jsCover;
            case "222":
                return vueCover;
            case "333":
                return reactCover;
            case "444":
                return nodeCover;
            default:
                return "";
        }
    }

    render() {
        const { lessonId, account, accountType } = this.props;
        const { studentNum, lessonName, intro, modalStatus } = this.state;
        return (
            <div className="lessonHead">
                <img className="headImage" src={this.getCover(lessonId)} alt="img" />
                <div className="headText">
                    <div className="mytext">
                        <p className="textHead">{lessonName}</p>
                        <p>指导教师：前端小丸子</p>
                        <p>{`学习人数：${studentNum}`}</p>
                    </div>
                    {
                        account ? (
                            accountType==="teacher"?
                            (<button className="btn btn-primary myLink" onClick={() => { this.setState({ modalStatus: true }) }}>推荐课程</button>):
                            (<button className="btn btn-primary myLink">收藏课程</button>)
                        )
                            : (<button className="btn btn-primary"><Link to={`/`} className="myLink">学习课程</Link></button>)
                    }

                </div>
                <div className="intro">
                    <p>
                        <span>简介：</span>
                        {intro}
                    </p>
                </div>
                <MyModal
                    status={modalStatus}
                    head="课程推荐链接"
                    text={`课程地址：/lesson/${lessonId}`}
                    handleClose={() => { this.setState({ modalStatus: false }) }}
                    handleTrue={() => { this.setState({ modalStatus: false }) }}
                />
            </div>
        );
    }
}