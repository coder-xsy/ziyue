import React, { Component } from 'react';
import faceBook from '../../img/facebook.png';
import ins from '../../img/in.png';
import youtube from '../../img/youtube.png';
// import '../../style/containers/footer.css';
export default class Footer extends Component{
    render(){
        return (
            <div className = "bottom-menu bottom-menu-inverse" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-sm-2">
                            <button className="btn btn-hg btn-primary">子曰</button>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <ul className="bottom-menu-list">
                                <li>网站首页</li>
                                <li>版权政策</li>
                                <li>联系我们</li>
                                <li>意见反馈</li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-2">
                            <ul className="bottom-menu-iconic-list">
                                <li>
                                    <a href="javascript:void(0);" className="fui-linkedin"></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="fui-pinterest"></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" className="fui-twitter"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <span className = "footLogo">子曰</span>
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
                </div> */}
            </div>
        )
    }
}