import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import QuesTitle from '../../img/list.jpg';
import '../../style/containers/QuesList.css';

export default class QuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qlist: []
        }
    }
    componentDidMount() {
        /**获取问题列表的数据(与弹幕中的内容数据结构不同) */
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/watchpage/getList?lessonId=${this.props.lessonId}&chapterId=${this.props.chapterId}`,
            { method: 'GET' })
            .then(res => res.json())
            .then(response => {
                // console.log('qlist load:',response);
                this.setState({
                    qlist: [].concat(response.list)
                });
            });
    }

    render() {
        const { qlist } = this.state;
        const {account,accountType}=this.props;
        return (
            <div className="listBox">
                <table className="table mytable">
                    <tbody>
                        {
                            qlist.length === 0 ? (<tr><td>none</td></tr>) : (qlist.map(
                                (item, index) => (
                                    <tr key={index}>
                                        {/* <td className="indexTip" title={`跳到${item.indexTip}`}>{item.indexTip}</td> */}
                                        <td className="indexTip">{item.indexTip}</td>
                                        <td className="quesText" title="查看解答"><Link to ={`/${accountType}/${account}/ansQues/${item.quesId}`}>{item.text}</Link></td>
                                        <td>{item.sendTime}</td>
                                    </tr>
                                )
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}