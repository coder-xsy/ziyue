import React, { Component } from 'react';
import E from 'wangeditor';
import Myheader from '../containers/Myheader.js';
import Footer from '../containers/Footer.js';
import QuesLogo from '../../img/ques.png';
import AnsLogo from '../../img/ansLogo.png';

import '../../style/pages/ansQues.css';

export default class AnsQues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ques: null,
            ans: null,
            editorContent: ""
        }
    }


    getQues = () => {
        const { quesId } = this.props.match.params;
        console.log(quesId);
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getQues?quesId=${quesId}`, { method: "GET" })
            .then(res => res.json())
            .then(
            response => {
                if (response.status === 1) {
                    this.setState({
                        ques: response.data.ques,
                        ans: response.data.ans
                    });
                } else {
                    console.log(response);
                }
            }
            )
    }

    componentDidMount() {
        const { accountType } = this.props.match.params;
        if (accountType === "teacher") {
            const elem = this.refs.editorElem;
            const editor = new E(elem);
            editor.customConfig.onchange = html => {
                console.log(this.state.editorContent);
                this.setState({
                    editorContent: html
                })
            };
            //考虑使用xss.js来防止xss攻击
            editor.customConfig.uploadImgShowBase64 = true;
            //演示阶段使用base64来显示保存图片，之后使用服务器端上传图片的方式
            editor.customConfig.pasteIgnoreImg = true;
            //关闭对于粘贴图片的复制粘贴
            editor.customConfig.menus = [
                //'head',  // 标题
                //'bold',  // 粗体
                //'fontSize',  // 字号
                //'fontName',  // 字体
                //'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                // 'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                // 'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ];
            editor.create();
        }
        this.getQues();
    }

    handleHeadChange = (event) => {
        if (this.state.ans) {
            let updata = JSON.parse(JSON.stringify(this.state.ans));
            updata.ansHead = event.target.value;
            this.setState({
                ans: updata
            });
        }
    }

    handleSubmit = () => {
        console.log(this.state.editorContent, 'type:', typeof (this.state.editorContent));
    }
    /**
     * 使用dangerouslySetInnerHTML的属性必须是双下划线加html
     */
    render() {
        const { account, accountType } = this.props.match.params;
        const { ques, ans } = this.state;
        return (
            <div className="ansQuesPage">
                <Myheader account={account} accountType={accountType} />
                <div className="content">
                    <div className="ansQuesBox col-sm-8">
                        <div className="quesDetail">
                            <p className="title">
                                <img src={QuesLogo} alt="quesLogo" />
                                问题详情
                            </p>
                            <div className="detailItem">
                                <span>问题：</span>
                                <p>
                                    {
                                        ques ? ques.quesText : ""
                                    }
                                </p>
                            </div>
                            <div className="detailItem">
                                <span>所属课程：</span>
                                <p>
                                    <span>{ques ? ques.lessonName : ""}</span>
                                    <span>{ques ? '>' : ""}</span>
                                    <span>{ques ? ques.chapterName : ""}</span>
                                </p>
                            </div>
                            <div className="detailItem">
                                <span>提问人：</span>
                                <p>{ques ? ques.person : ""}</p>
                            </div>
                            <div className="detailItem">
                                <span>提出时间：</span>
                                <p>{ques ? ques.time : ""}</p>
                            </div>
                        </div>
                        {accountType === "teacher" ?
                            (<div className="ansBox">
                                <p className="title">
                                    <img src={AnsLogo} alt="ansLogo" />
                                    解答
                                </p>
                                <input className="headText" placeholder="标题" />
                                    {/* value={ans?ans.ansHead:""}
                                    onChange={this.handleHeadChange} */}
                                
                                <div ref="editorElem" className="form">

                                </div>
                                <div className="submitBtn">
                                    <button onClick={this.handleSubmit} className="btn btn-primary btn-wide">提交</button>
                                </div>
                            </div>) : (
                                <div className="ansBox">
                                    <p className="title">
                                        <img src={AnsLogo} alt="ansLogo" />
                                        解答
                                    </p>
                                    <h5 className="ansHead">
                                        <span>标题：</span>
                                        <span>{ans ? ans.ansHead : ""}</span>
                                    </h5>
                                    <div className="ansText" dangerouslySetInnerHTML={{ __html: ans ? ans.ansHtml : "" }}>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}