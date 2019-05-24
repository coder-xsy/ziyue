import React, { Component } from 'react';
import '../../style/pages/lessonPage.css';

import Footer from '../containers/Footer.js';
import Myheader from '../containers/Myheader.js';
import Lesson from '../containers/lesson.js';

export default class LessonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { lessonId, accountType, account } = this.props.match.params;
        return (
            <div className="lessonPage">
                <Myheader account={account} accountType={accountType} type="lesson" />
                <div className="main">
                    <Lesson lessonId={lessonId} accountType={accountType} account={account} />
                </div>
                <Footer />
            </div>
        );
    }
}