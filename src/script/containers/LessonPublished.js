import React, { Component } from 'react';
import JSlesson from '../../img/lessonJS.jpg';
import '../../style/containers/lessonPublished.css';
export default class LessonPublished extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**实际是由上层传入person account 然后请求得到 */
            chosedId: '123456789',
            lessonList: [
                {
                    name: 'js入门',
                    id: '123456789'
                },
                {
                    name: 'react实践',
                    id: '456789123'
                },
                {
                    name: 'vue开发',
                    id: '789213456'
                },
                {
                    name: 'spring实战',
                    id: '15935746'
                }
            ]
        }
    }

    render() {
        const { lessonList, chosedId } = this.state;
        return (
            <div className="ownLessons">
                <div className="lessons">
                    {
                        lessonList.map((item) => (
                            <div 
                                className = {`${item.id === chosedId?'chosed':''}`}
                                onClick = { () => {this.setState({chosedId:item.id})} }
                            >
                                <p>{item.name}</p>
                            </div>
                        )
                        )
                    }
                </div>
                <div className="lessonInf">
                    <div className="lessonIntro">
                        <img src={ JSlesson } alt="cover" className="cover"/>
                        <div className="textIntro">
                            <h2>课程：javascript入门教程</h2>
                            <p>学习人数：56</p>
                            <p>问答：45</p>
                        </div>
                        <button>分享</button>
                    </div>
                    <div className="lessonQues">
                        <div>
                            <button>未解答&nbsp;23</button>
                            <button className="chosed">已解答&nbsp;22</button>
                        </div>
                        <div>
                            问题列表
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}