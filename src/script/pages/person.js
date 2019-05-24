import React, { Component } from 'react';
import '../../style/pages/person.css';
import LessonBox from '../containers/LessonBox.js';
// import LessonPublished from '../containers/LessonPublished.js';
import MyLessons from '../containers/myLessons.js';
// import Lesson from '../containers/lesson.js';
import PersonEdit from '../containers/personEdit.js';
import Footer from '../containers/Footer.js';

import Myheader from '../containers/Myheader.js';
export default class Person extends Component {
    render() {
        const { type,account,accountType } = this.props.match.params;
        /**
         * type:student or teacher
         * account:用户账号
         * type:lessons or personInf
         */
        return (
            <div className="person">
                {/* <Myheader page="person" toggle={this.handletoggle} /> */}
                <Myheader account={account} accountType={accountType} type={type}/>
                <div className="main">
                    {/* {this.renderPersonInf()} */}
                    {/* <PersonEdit /> */}
                    {/* <LessonBox account={account} /> */}
                    {/* <MyLessons account={account} /> */}
                    {/* <Lesson /> */}
                    {
                        type==="personInf"?
                            (<PersonEdit account={account} />):
                            (accountType==="student"?(<LessonBox account={account} accountType={accountType}/>):(<MyLessons account={account}/>))
                    }
                
                </div>
                <Footer />
            </div>
        );
    }
}