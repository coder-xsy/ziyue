import React,{Component} from 'react';
import {Link} from "react-router-dom";
import jsCover from '../../img/lessonJS.jpg';
import vueCover from '../../img/vue.jpg';
import reactCover from '../../img/react.jpg';
import nodeCover from '../../img/node.jpg';
import '../../style/components/lessonHead.css';

export default class LessonHead extends Component{
    constructor(props){
        super(props);
        this.state={
            lessonName:'',
            studentNum:'',
            cover:''
        }
    }

    componentDidMount(){
        const {lessonId} = this.props;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getLessonHead?lessonId=${lessonId}`,{method:"GET"})
        .then(res=>res.json())
        .then(response=>{
            if(response.status===1){
                this.setState(response.data);
            }else{
                console.log('get lesson head error');
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

    render(){
        const {lessonId,account} = this.props;
        const {studentNum,lessonName} = this.state;
        return (
            <div className="lessonHead">
                <img className="headImage" src={this.getCover(lessonId)} alt="img"/>
                <div className="headText">
                    <div className="mytext">
                        <p className="textHead">{lessonName}</p>
                        <p>{`学习人数：${studentNum}`}</p>
                    </div>
                    <button className="btn btn-primary">
                        {
                            account?(<Link to={`/lesson/${lessonId}`} className="myLink">推荐课程</Link>)
                            :(<Link to={`/`} className="myLink">学习课程</Link>)
                        }
                        
                    </button>
                </div>
            </div>
        );
    }
}