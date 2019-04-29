import React, { Component } from 'react';
import LessonItem from '../components/LessonItem.js';

import '../../style/containers/lessonBox.css';

export default class lessonBox extends Component{
    constructor(props){
        super(props);
        this.state={
            type:'all',
            lessonList:[
                // {
                //     lessonId:'111',
                //     lessonName:'JavaScript入门教程',
                //     cover:'img',
                //     lessonRate:20,
                //     lessonRateTitle:'2-1 原型链的继承',
                //     quesCount:2
                // },
                // {
                //     lessonId:'222',
                //     lessonName:'react入门教程',
                //     cover:'img',
                //     lessonRate:20,
                //     lessonRateTitle:'2-1 原型链的继承',
                //     quesCount:2
                // },
                // {
                //     lessonId:'333',
                //     lessonName:'vue入门教程',
                //     cover:'img',
                //     lessonRate:20,
                //     lessonRateTitle:'2-1 原型链的继承',
                //     quesCount:2
                // }
            ]
        }
    }

    componentDidMount(){
        this.getLessons('all');
    }

    getLessons = (type) => {
        const { account } = this.props;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/student/getlessons?account=${account}&type=${type}`,
        {method:'GET'})
        .then(res=>res.json())
        .catch(err=>console.log('get lessonList error:',err))
        .then(response=>{
            if(response.status===1){
                this.setState({lessonList:response.data});
            }else{
                console.log('set Personinf error');
            }
        });
    }

    render(){
        const { type, lessonList } = this.state;
        return (
            <div className = "lessonBox">
                <div className = "typeChose">
                    <span 
                        className = { `${type === 'all' ? "active" : ""}`} 
                        onClick = {() => {
                                this.setState({type:'all'});
                                this.getLessons('all');
                            }
                        } 
                    >所有课程</span>
                    <span 
                        className = { `${type === 'studying' ? "active" : ""}` }
                        onClick = { () => {
                                this.setState({type:'studying'});
                                this.getLessons('studying');
                            } 
                        }
                    >学习中</span>
                    <span 
                        className = { `${type === 'studied' ? "active" : ""}` } 
                        onClick = { () => {
                                this.setState({type:'studied'});
                                this.getLessons('studied');
                            }
                        }
                    >已完成</span>
                </div>
                {
                    lessonList.length!==0?lessonList.map(item => (<LessonItem key = {item.lessonId} account={this.props.account} inf = {item} />)):''
                }
            </div>
        );
    }
}