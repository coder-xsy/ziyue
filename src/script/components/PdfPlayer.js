import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../../pdf/pdfTest.pdf';
import togglebtn from '../../img/pdfTogglePage.png';
import '../../style/components/pdfPlayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PdfPlayer extends Component{
    constructor(props){
        super(props);
        this.state={
            pageNum:1,
            pageIndex:1
        }
    }
    onDocumentLoadSuccess = ({ numPages }) =>{
        this.setState({
            pageNum:numPages
        });
        console.log(numPages);
    }

    prePage = () => {
        const { pageIndex } = this.state;
        const index = pageIndex>1?(pageIndex-1):pageIndex;
        this.setState({
            pageIndex:index
        });
    }

    nextPage = () => {
        const { pageNum, pageIndex } = this.state;
        const index = pageIndex<pageNum?(pageIndex+1):pageIndex;
        this.setState({
            pageIndex:index
        });
    }

    render(){
        const { pageNum, pageIndex } = this.state;
        return(
            <div className="pdfPlayer">
                <Document 
                    className="pdfContent"
                    file = { pdfFile }
                    onLoadSuccess = { this.onDocumentLoadSuccess }
                    onLoadError = {(error)=>console.log('error:',error)}
                >
                    <Page pageNumber = { pageIndex } /> 
                </Document>
                <div className="togglePage">
                    <span><img className = "toggleBtn pre" onClick = {this.prePage} src = { togglebtn } title = "上一页" alt = "上一页" /></span>
                    <span className = "pageIndexTag">{`${pageIndex}/${pageNum}页`}</span>
                    <span><img className = "toggleBtn next" onClick = { this.nextPage } src = { togglebtn } title = "下一页" alt = "下一页" /></span>
                </div>
            </div>
        );
    }
}