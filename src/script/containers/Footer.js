import React, { Component } from 'react';
import faceBook from '../../img/facebook.png';
import ins from '../../img/in.png';
import youtube from '../../img/youtube.png';
import '../../style/containers/footer.css';
export default class Footer extends Component{
    render(){
        return (
            <div className = "foot" >
                <span className = "footLogo">子曰</span>
                <div className = "footLinks">
                    <span>网站首页</span>
                    <span>版权政策</span>
                    <span>联系我们</span>
                    <span>意见反馈</span>
                </div>
                <span>
                    @2014-2019coderxsy software LLC All rights reserved
                </span>
                <div className = "shareLinks">
                    <img src = { youtube } alt = "youtube"/>
                    <img src = { ins } alt = "ins" />
                    <img src = { faceBook } alt = 'faceBook' />
                </div>
            </div>
        )
    }
}