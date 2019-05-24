import React, { Component } from 'react';
import LessonItem from '../components/LessonItem.js';

import '../../style/containers/lessonBox.css';

export default class lessonBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'all',
            lessonList: []
        };
        /**
         * item:{
         *  lessonId,lessonName,cover,chapterTitle,chapterId,quesCount
         * }
         */
    }

    componentDidMount() {
        this.getLessons('all');
    }

    getLessons = (type) => {
        const { account } = this.props;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/student/getlessons?account=${account}&type=${type}`,
            { method: 'GET' })
            .then(res => res.json())
            .catch(err => console.log('get lessonList error:', err))
            .then(response => {
                if (response.status === 1) {
                    this.setState({ lessonList: response.data });
                } else {
                    console.log('set Personinf error');
                }
            });
    }

    render() {
        const { type, lessonList } = this.state;
        return (
            <div className="lessonBox col-sm-8">
                <div className="typeChose">
                    <button
                        className={`btn btn-default ${type === 'all' ? "btn-primary" : ""} mytypeBtn`}
                        onClick={() => {
                            this.setState({ type: 'all' });
                            this.getLessons('all');
                        }
                        }
                    >所有课程</button>
                    <button
                        className={`btn btn-default ${type === 'studying' ? "btn-primary" : ""} mytypeBtn`}
                        onClick={() => {
                            this.setState({ type: 'studying' });
                            this.getLessons('studying');
                        }
                        }
                    >学习中</button>
                    <button
                        className={`btn btn-default ${type === 'studied' ? "btn-primary" : ""} mytypeBtn`}
                        onClick={() => {
                            this.setState({ type: 'studied' });
                            this.getLessons('studied');
                        }
                        }
                    >已完成</button>
                </div>
                {
                    lessonList.length !== 0 ? lessonList.map(item => (
                        <LessonItem
                            key={item.lessonId}
                            account={this.props.account}
                            accountType={this.props.accountType}
                            inf={item}
                        />
                    )) : ''
                }
            </div>
        );
    }
}