import React,{Component} from "react";
import {Link} from "react-router-dom";
import jsCover from '../../img/lessonJS.jpg';
import cover2 from '../../img/js-112.jpg';
import cover3 from '../../img/js-113.jpg';
import "../../style/components/searchLesson.css";
export default class SearchLesson extends Component{
    getCover = (id) => {
        switch (id) {
            case "111":
                return jsCover;
            case "112":
                return cover2;
            case "113":
                return cover3;
            default:
                return "";
        }
    }

    render(){
        const {account,accountType,cover,lessonName,lessonId,teacherName,count,intro} = this.props;
        return (
            <Link to={`/${accountType}/${account}/lesson/111`} className="searchLesson">
                <img className="lessonCover" src={this.getCover(lessonId)} alt="lessonCover"/>
                <div className="text">
                    <p className="lessonName">{lessonName}</p>
                    <p>{`指导教师：${teacherName}`}</p>
                    <p>{`学习人数：${count}`}</p>
                    <p>{`简介：${intro}`}</p>
                </div>
            </Link>
        )
    }
}