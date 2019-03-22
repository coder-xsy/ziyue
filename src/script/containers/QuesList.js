import React, { Component } from 'react';
import Hidden from '../../img/right.png';
import Show from '../../img/left.png';
import '../../style/containers/QuesList.css';

export default class QuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qlistState: 0
        }
    }

    handleSlideR = () => {
        this.setState({
            qlistState: 2
        });
    }

    handleSlideL = () => {
        this.setState({
            qlistState: 1
        });
    }

    render() {
        return (
            <div
                className={`listContainer ${this.state.qlistState === 0 ? "slideInit"
                    : this.state.qlistState === 1 ? 'aniSlideLeft' : 'aniSlideRight'}`}>
                <div className="list">
                    <img width="48px" className="hidden" onClick={this.handleSlideR} src={Hidden} alt="hidden" />
                    <img width="48px" className="show" onClick={this.handleSlideL} src={Show} alt="show" />
                    <h3 className="title">
                        <span className="vtime">时间</span>
                        <span className="ques">问题</span>
                        <span className="sendTime">发送时间</span>
                    </h3>
                    <p className="listItem">
                        <span className="vtime">02:33</span>
                        <span className="ques">原型链在javascript的继承中所起到的作用具体是什么呢？</span>
                        <span className="sendTime">02-22 19:55</span>
                    </p>
                    <p className="listItem">
                        <span className="vtime">02:23</span>
                        <span className="ques">原型链</span>
                        <span className="sendTime">02-23 18:45</span>
                    </p>
                </div>
            </div>
        );
    }
}