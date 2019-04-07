import React, { Component } from 'react';
import Hidden from '../../img/right.png';
import Show from '../../img/left.png';
import '../../style/containers/QuesList.css';

export default class QuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qlistState: 0,
            qlist: []
        }
    }
    componentDidMount() {
        /**获取问题列表的数据(与弹幕中的内容数据结构不同) */
        fetch(`http://yapi.demo.qunar.com/mock/52554/qlist?id=${this.props.lessonId}`,
            { method: 'GET' })
            .then(res => res.json())
            .then(response => {
                // console.log('qlist load:',response);
                this.setState({
                    qlist: [].concat(response)
                });
            });
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
        const { qlist } = this.state;
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
                    {
                        qlist.map((item,index) => (
                            <p className="listItem" key = { index }>
                                <span className="vtime">{ item.videoTime }</span>
                                <span className="ques">{ item.ques }</span>
                                <span className="sendTime">{ item.sendTime }</span>
                            </p>
                        ))
                    }
                </div>
            </div>
        );
    }
}