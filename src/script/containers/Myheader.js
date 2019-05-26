import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../img/ziyueLogo.png";

import '../../style/containers/myheader.css';
export default class Myheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatus: false,
      warnStatus:false,
      keyword: this.props.keyword?this.props.keyword:"",
      typeValue: this.props.searchType?this.props.searchType:"lesson"
    }
  }

  handleInput = (event) => {
    this.setState({
      keyword: event.target.value
    });
  }

  handleToggleType = (event) => {
    this.setState({
      typeValue: event.target.value
    });
  }

  handleSearch = ()=>{
    const {keyword,typeValue} = this.state;
    const {account,accountType} = this.props;
    if(keyword===""){
      this.setState({
        warnStatus:true
      });
    }else{
      // console.log(this.props.history);
      this.props.history.push(`/${accountType}/${account}/search?type=${typeValue}&key=${keyword}`);
    }
  }

  toggleShow = () => {
    this.setState((prevState, props) => ({ showStatus: !prevState.showStatus }))
  };

  render() {
    const { account, accountType, type } = this.props;
    const { keyword, typeValue } = this.state;
    return (
      <nav className={`navbar-inverse myheader`}>
        <div className="navbar-header">
          <a className="navbar-brand mybrand" href="javascript:void(0)">
            <img className="myLogo" src={Logo} alt="子曰" />
          </a>
        </div>
        {
          account ? (
            <div className={`mynavList ${this.state.showStatus ? 'show' : ''}`}>
              <div className={`${type === "lessons" ? 'active' : 'mytoggleItem'}`}>
                <Link to={`/person/${accountType}/${account}/lessons`}>{accountType === "student" ? "我的课程" : "课程中心"}</Link>
              </div>
              <div className={`${type === "personInf" ? 'active' : 'mytoggleItem'}`}>
                <Link to={`/person/${accountType}/${account}/personInf`}>个人中心</Link>
              </div>

              {
                accountType === "student" ? (
                  <div className="mysearch">
                    <input type="text"
                      value={keyword}
                      onChange={this.handleInput}
                      placeholder="搜索"
                      className="form-control"
                    />
                    {/* <button type="button" className="btn btn-primary mySearchbtn">搜索</button> */}
                    <button className="mysearchbtn" onClick={this.handleSearch}>搜索</button>
                    <select className="typeSelect" value={typeValue} onChange={this.handleToggleType}>
                      <option value="lesson">课程</option>
                      <option value="question">问题</option>
                    </select>
                  </div>
                ) : ""}
            </div>

          ) : ""}

        {account ? (<button type="button" onClick={this.toggleShow} className="mytoggle"></button>) : ""}

      </nav>
    );
  }
}

