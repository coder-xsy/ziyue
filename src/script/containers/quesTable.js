import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MyModal from "../components/MyModal.js";
import '../../style/containers/quesTable.css';
export default class QuesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true,

            modalStatus:false,
            modalText:"",
            delCheckIndex:0,

            filterType: 0,
            pageIndex: 1,
            quesTotal: 10,
            list: [
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '11'
                // },
                // {
                //     ques: 'JavaScript原型链的继承JavaScript原型链的继承JavaScript原型链的继承JavaScript原型链的继承',
                //     quesId: '12'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '13'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '14'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '15'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '16'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '17'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '18'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '19'
                // },
                // {
                //     ques: 'JavaScript原型链的继承',
                //     quesId: '20'
                // }
            ]
        };
    }

    getList = (filterType, pageIndex) => {
        const { lessonId } = this.props;
        // const {filterType,pageIndex} = this.state;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getQuesList?lessonId=${lessonId}&filterType=${filterType}&pageIndex=${pageIndex}`, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.status === 1) {
                    this.setState({
                        quesTotal: response.total,
                        list: response.data
                    });
                }
            })
    }

    componentDidMount() {
        const { filterType, pageIndex } = this.state;
        this.getList(filterType, pageIndex);
    }

    handleFilterChange = (event) => {
        this.setState({
            filterType: event.target.value
        });
        console.log(event.target.value);
        this.getList(event.target.value, this.state.pageIndex);
    }

    handleDelItem = (index)=>{
        let updata = JSON.parse(JSON.stringify(this.state.list));
        updata.splice(index,1);
        this.setState({
            list:updata
        });
    }

    handleShowModal = (text,index)=>{
        this.setState({
            modalStatus:true,
            modalText:`问题${index+1}：${text}`,
            delCheckIndex:index
        });
    }

    handleOK = ()=>{
        const {delCheckIndex} = this.state;
        this.handleDelItem(delCheckIndex);
        this.setState({
            modalStatus:false,
            modalText:"",
            delCheckIndex:""
        });
    }

    handleCancel = ()=>{
        this.setState({
            modalStatus:false,
            modalText:"",
            delCheckIndex:""
        });
    }

    handlefoldBox = () => {
        this.setState((preState, props) => ({ status: !preState.status }));
    }

    render() {
        const { status, list, filterType } = this.state;
        const { account } = this.props;
        return (
            <div className="quesTable">
                <h5 className="columnName" onClick={this.handlefoldBox}><span className="fui-question-circle myicon"></span>课程提问</h5>
                <div className={`${status ? "" : "foldBox"}`}>
                    <table className="table table-striped questions">
                        <tbody>
                            <tr>
                                <th>NO</th>
                                <th>
                                    <select className="myselect" value={filterType} onChange={this.handleFilterChange}>
                                        <option value="0">所有问题</option>
                                        <option value="1">已解答</option>
                                        <option value="2">未解答</option>
                                    </select>
                                </th>
                                <th>提问时间</th>
                                <th>热度</th>
                                <th>操作</th>
                            </tr>
                            {
                                list.length !== 0 ? (
                                    list.map((item, index) => (
                                        <tr key={item.quesId}>
                                            <td>{index+1}</td>
                                            <td className="questd">
                                                <span className={`${item.ansStatus?"fui-check-circle":"fui-question-circle"} mydiff`}></span>
                                                <span>{item.quesText}</span>
                                            </td>
                                            <td>{item.time}</td>
                                            <td>{item.hot}</td>
                                            <td>
                                                <span className="delBtn" onClick={()=>{this.handleShowModal(item.quesText,index)}}>删除</span>
                                                <Link to={`/teacher/${account}/ansQues/123`} className="ansBtn" >解答</Link>
                                            </td>
                                        </tr>
                                    ))) : (<tr></tr>)
                            }
                        </tbody>
                    </table>
                    <MyModal 
                        status={this.state.modalStatus} 
                        head="确认删除"
                        text={this.state.modalText} 
                        handleTrue={this.handleOK}
                        handleClose = {this.handleCancel}
                        handleFalse={this.handleCancel}
                    />
                    <div className="pagination">
                        <ul>
                            <li className="previous">
                                <a href="javascript:void(0);" className="fui-arrow-left"></a>
                            </li>
                            <li className="pageBtn">
                                <a href="javascript:void(0);">1</a>
                            </li>
                            <li className="pageBtn">
                                <a href="javascript:void(0);">2</a>
                            </li>
                            <li className="pageBtn">
                                <a href="javascript:void(0);">3</a>
                            </li>
                            <li className="pageBtn">
                                <a href="javascript:void(0);">4</a>
                            </li>
                            <li className="pageBtn">
                                <a href="javascript:void(0);">5</a>
                            </li>
                            <li className="next">
                                <a href="javascript:void(0);" className="fui-arrow-right"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}