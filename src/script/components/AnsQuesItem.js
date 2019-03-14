import React, { Component } from 'react';
import sUser from '../../img/sUser.png';
import { Row, Col } from 'react-bootstrap';
import '../../style/components/AnsQuesItem.css';
export default class AnsQuesItem extends Component {
    render() {
        let { queUser, queTime, queDate, que,
            ansUser, ansTime, ansDate, ans } = this.props.inf;
        return (
            <div className = "ansQuesItem">
                <div className = "Ques">
                    <label>问题:</label>
                    <div className = "content">
                        <div className = "queInf">
                            <div className = "quesUser">
                                <img src={ sUser } alt="用户" className = "sUser" />
                                <span>{ queUser }&nbsp;-&nbsp;</span>
                                <span>{ queTime }</span>
                            </div>
                            <span>{ queDate }</span>
                        </div>
                        <div className = "quesText">
                           { que } 
                        </div>
                    </div>
                </div>
                <div className = "Ans">
                    <label>回答:</label>
                    <div className = "content">
                        <div className = "ansInf">
                            <div className = "ansUser">
                                <img src={ sUser } alt = "用户" className = "sUser" />
                                <span>{ ansUser }&nbsp;-&nbsp;</span>
                                <span>{ ansTime }</span>
                            </div>
                            <span>{ ansDate }</span>
                        </div>
                        <div className = "quesText">
                            {ans}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}