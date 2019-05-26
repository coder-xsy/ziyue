import React,{Component} from 'react';
import LessonHead from '../components/lessonHead.js';
import ChapterBox from './chapterBox.js';
import QuesTable from './quesTable.js';
import '../../style/containers/lesson.css';
export default class Lesson extends Component{
    constructor(props){
        super(props);
        this.state={
            loginStatus:true,
        };
    }
    
    render(){
        const {lessonId,accountType,account} = this.props;
        const {loginStatus} = this.state;
        return(
            <div className="oneLesson col-sm-8">
                <LessonHead account={account} lessonId={lessonId} accountType={accountType}/>
                <ChapterBox lessonId={lessonId} />
                {accountType==='teacher'&&loginStatus?(<QuesTable account={account} lessonId={lessonId} />):('')}
            </div>
        );
    }
}