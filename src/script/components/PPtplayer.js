import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import "../../style/components/pptPlayer.css";
export default class PPtPlayer extends Component {
    findnode = () => {
        // console.log(findDOMNode(this.refs.ppt).contentDocument);
        //console.log(findDOMNode(this.refs.ppt),document.domain);
    }
    componentDidMount(){
        //console.log(findDOMNode(this.refs.ppt).contentDocument);
    }
    render() {
        return (
           <div className="pptPlayer">
                <iframe 
                    onLoad={this.findnode}
                    ref="ppt"
                    title = "pptPlayer"
                    className = "ppt"
                    src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fmczaiyun%2Etop%3A80%2Fht%2F2%2Eppt&amp;wdAr=1.7777777777777777" 
                    frameBorder="0">
                </iframe>
            </div>
        )
    }
}