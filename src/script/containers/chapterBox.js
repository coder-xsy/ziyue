import React, { Component } from 'react';
import Chapter from '../components/chapter.js';
import '../../style/containers/chapterBox.css';
export default class ChapterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            chapters: []
            // chapters: [
            //     {
            //         chapterTitle: '1chapter',
            //         chapterItems: [
            //             {
            //                 chapterId: '112',
            //                 chapterName: '1-1 chapter'
            //             },
            //             {
            //                 chapterId: '113',
            //                 chapterName: '1-2 chapter'
            //             },
            //             {
            //                 chapterId: '114',
            //                 chapterName: '1-3 chapter'
            //             },
            //             {
            //                 chapterId: '115',
            //                 chapterName: '1-4 chapter'
            //             }
            //         ]
            //     },
            //     {
            //         chapterTitle: '2chapter',
            //         chapterItems: [
            //             {
            //                 chapterId: '121',
            //                 chapterName: '2-1 chapter'
            //             },
            //             {
            //                 chapterId: '131',
            //                 chapterName: '2-2 chapter'
            //             },
            //             {
            //                 chapterId: '141',
            //                 chapterName: '2-3 chapter'
            //             },
            //             {
            //                 chapterId: '151',
            //                 chapterName: '2-4 chapter'
            //             }
            //         ]
            //     },
            //     {
            //         chapterTitle: '3chapter',
            //         chapterItems: [
            //             {
            //                 chapterId: '161',
            //                 chapterName: '3-1 chapter'
            //             },
            //             {
            //                 chapterId: '171',
            //                 chapterName: '3-2 chapter'
            //             },
            //             {
            //                 chapterId: '181',
            //                 chapterName: '3-3 chapter'
            //             },
            //             {
            //                 chapterId: '191',
            //                 chapterName: '3-4 chapter'
            //             }
            //         ]
            //     }
            // ]
        }
    }

    componentDidMount() {
        const { lessonId } = this.props;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getChapter?lessonId=${lessonId}`, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.status === 1) {
                    this.setState({
                        chapters: response.data
                    });
                } else {
                    console.log('get lesson chapter error');
                }
            })
    }

    handleFoldBox = () => {
        this.setState((preState, props) => ({ status: !preState.status }));
    }

    render() {
        const { chapters, status } = this.state;
        return (
            <div className="chapterBox">
                <h5 className="columnName" onClick={this.handleFoldBox}><span className="fui-list-bulleted myicon"></span>课程目录</h5>
                <div className={`chapters ${status ? '' : 'boxfold'}`}>
                    {
                        chapters.length !== 0 ? (
                            chapters.map((item) => (
                                <Chapter
                                    key={item.chapterTitle}
                                    chapterTitle={item.chapterTitle}
                                    chapterItems={item.chapterItems}
                                />
                            ))
                        ) : ""
                    }
                </div>
            </div>
        )
    }
}
