import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../style/components/chapter.css';
export default class Chapter extends Component {
    render() {
        /** chapterTitle string; chapterItems Array of Obejct {chapterid,chapterName} */
        const { chapterTitle, chapterItems } = this.props;
        return (
            <div className="chapter">
                <p className="chapterTitle">{chapterTitle}</p>
                <div className="chapterChidren">
                    {
                        chapterItems.map(
                            item => (
                                <p key={item.chapterId} className="chapterChild">
                                    <Link to="/teacher/22/watchpage/111/0" className="mylink">{item.chapterName}</Link>
                                </p>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}