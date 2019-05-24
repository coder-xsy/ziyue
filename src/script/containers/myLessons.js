import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/containers/myLessons.css';
import jsCover from '../../img/lessonJS.jpg';
import vueCover from '../../img/vue.jpg';
import reactCover from '../../img/react.jpg';
import nodeCover from '../../img/node.jpg';

export default class MyLessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonList: []
        }
        /**
         * item :{lessonId,lessonName,lessonCover}
         */
    }

    getLessons = () => {
        const { account } = this.props;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getLessons?account=${account}`, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.status === 1) {
                    this.setState({
                        lessonList: response.data
                    });
                } else {
                    console.log('error on ger lesson for teacher');
                }
            })
    }

    getCover = (id)=>{
        switch(id){
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

    componentDidMount() {
        this.getLessons();
    }

    render() {
        const { lessonList } = this.state;
        const { account } = this.props;
        return (
            <div className="myLessons col-sm-10">
                <h5 className="itemTitle">教授课程</h5>
                <div className="lessonsContainer">
                    {
                        lessonList.length !== 0 ? (
                            lessonList.map(item => (
                                <div className="mylessonTip" key={item.lessonId}>
                                    <img src={this.getCover(item.lessonId)} alt="lesonCOver" />
                                    <div className="textContainer">
                                        <p className="lessonName">{item.lessonName}</p>
                                        <button className="btn btn-primary"><Link to={`/teacher/${account}/lesson/${item.lessonId}`} className="mylink">查看详情</Link></button>
                                    </div>
                                </div>
                            )
                            )
                        ):""
                    }
                </div>
            </div>
        )
    }
}