import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/containers/myheader.css';
export default class Myheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      showStatus: false,
      active: 1
    }
  }

  toggleShow = () => {
    this.setState((prevState, props) => ({ showStatus: !prevState.showStatus }))
  };

  render() {
    const { account, accountType, type } = this.props;
    return (
      <nav className={`navbar-inverse myheader`}>
        <div className="navbar-header">
          <a className="navbar-brand" href="javascript:void(0)">logo</a>
        </div>
        {
          account ? (
            <div className={`mynavList ${this.state.showStatus ? 'show' : ''}`}>
              <div className={`${type === "lessons" ? 'active' : 'mytoggleItem'}`}>
                <Link to={`/person/${accountType}/${account}/lessons`}>{accountType==="student"?"我的课程":"课程中心"}</Link>
              </div>
              <div className={`${type === "personInf" ? 'active' : 'mytoggleItem'}`}>
                <Link to={`/person/${accountType}/${account}/personInf`}>个人中心</Link>
              </div>

              {
                accountType === "student" ? (
                  <div className="mysearch">
                    <input type="text" placeholder="搜索" className="form-control" />
                    <button type="button" className="btn btn-primary mySearchbtn">搜索</button>
                  </div>
                ) : ""}
            </div>

          ) : ""}

        {account ? (<button type="button" onClick={this.toggleShow} className="mytoggle"></button>) : ""}

      </nav>
    );
  }
}

