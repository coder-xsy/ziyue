import React, { Component } from "react";
import Myheader from '../containers/Myheader.js';
import Footer from '../containers/Footer.js';
import SearchLesson from "../components/searchLesson.js";
import SearchQuestion from "../components/searchQuestion.js";
import Empty from "../../img/empty.png";
import "../../style/pages/searchPage.css";
export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        const keys = this.getkeys(decodeURIComponent(this.props.location.search));
        this.state = {
            keyword: keys[1],//this.props.match.params.keyword,
            searchType: keys[0],//this.props.match.params.searchType,
            list: []
        }
    }

    componentDidMount() {
        const { keyword, searchType } = this.state;
        if (keyword !== "") {
            this.getList(searchType, keyword);
        }
    }

    componentWillReceiveProps(nextProps) {
        const keys = this.getkeys(decodeURIComponent(nextProps.location.search));
        this.setState({
            keyword: keys[1],
            searchType: keys[0]
        });
        this.getList(keys[0], keys[1]);
    }

    getList = (type, keyword) => {
        if (type === "lesson" && keyword === "javascript") {
            fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/searchLesson?keyword=${keyword}`, { method: "GET" })
                .then(res => res.json())
                .then(response => {
                    if (response.status === 1) {
                        this.setState({
                            list: response.data
                        });
                    }
                })
        } else if (type === "lesson" && keyword !== "javascript") {
            this.setState({
                list: []
            });
        } else if(type==="question"&& keyword!=="javascript"){
            this.setState({
                list:[]
            });
        } else if(type==="question"&& keyword==="javascript"){
            fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/searchques?keyword=${keyword}`, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.status === 1) {
                    this.setState({
                        list: response.data
                    });
                }
            })
        }
    }

    getkeys = (str) => {
        const keyArr = str.substr(1).split("&").map(item => item.split("=")[1]);
        return keyArr;
    }

    render() {
        const { account, accountType } = this.props.match.params;
        const { keyword, searchType, list } = this.state;
        return (
            <div className="searchPage">
                <Myheader
                    account={account}
                    accountType={accountType}
                    keyword={keyword}
                    searchType={searchType}
                    history={this.props.history}
                />
                <div className="main">
                    <div className="content col-sm-8">
                        <h5 className="searchTitle">{searchType === "lesson" ? "课程搜索" : "问题搜索"}</h5>
                        {
                            list.length === 0 ? (
                                <div className="empty">
                                    <div><img className="emptyCover" src={Empty} alt="empty" /></div>
                                    <h5>搜索结果为空</h5>
                                </div>
                            ) : (
                                    searchType === "lesson" ? (list.map(item => (
                                        <SearchLesson
                                            account={account}
                                            accountType={accountType}
                                            lessonName={item.lessonName}
                                            lessonId={item.lessonId}
                                            teacherName={item.teacherName}
                                            count={item.count}
                                            intro={item.intro}
                                        />
                                    ))) : (
                                            list.map(item=>(<SearchQuestion
                                                account={account}
                                                accountType={accountType}
                                                quesText={item.quesText}
                                                quesId="123"
                                                person={item.person}
                                                time={item.time}
                                                lesson={item.lesson}
                                                lessonId="111"
                                                chapter={item.lessonId}
                                                chapterId="0"
                                            />))
                                        )
                                )
                        }
                        {/* <SearchLesson
                            account={account}
                            accountType={accountType}
                            lessonName="javaScript入门教程"
                            lessonId="111"
                            teacherName="前端小丸子"
                            count="22"
                            intro="清晰严谨的审计专业知识讲述，形象生动的案例介绍，轻松活泼的视频动画制作，共同助推您洞悉审计理论，明晰审计实务，探析审计奥秘！"
                        /> */}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}