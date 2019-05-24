import React, { Component } from 'react';
import '../../style/containers/personEdit.css';
export default class PersonEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editStatus: true,
            account: this.props.account,
            email: '123456@qq.com',
            password: '12345'
        }
    }
    componentDidMount(){
        this.getPerson();
    }
    
    getPerson = () => {
        const account = this.props.account;
        fetch(`http://yapi.demo.qunar.com/mock/63878/ziyue/getPersonInf?account=${account}`,
            { method: 'GET' })
            .then(res => res.json())
            .catch(err => console.log(err))
            .then(response => {
                if (response.status === 1) {
                    this.setState({
                        email: response.inf.email,
                        password: response.inf.password,
                    });
                } else {
                    console.log('error on get personInf');
                }
            });
    }

    setPerson = () => {
        const { email, account, password } = this.state;
        fetch('http://yapi.demo.qunar.com/mock/63878/ziyue/setPersonInf',
            { method: 'POST', body: JSON.stringify({ email, account, password }) })
            .then(res => res.json())
            .catch(err => console.log('post personInf', err))
            .then(response => {
                if (response.status === 1) {
                    this.setState({ editStatus: true });
                } else {
                    console.log('set Personinf error',response);
                }
            });
    }

    activeEdit = ()=>{
        this.setState({
            editStatus:false
        });
    }

    activeSave = ()=>{
        this.setPerson();
    }


    editChange = (event) => {
        const updata = Object.assign({}, this.state);
        updata[event.target.name] = event.target.value;
        this.setState(updata);
    }

    render() {
        const { editStatus, account, email, password } = this.state;
        return (
            <div className="personEdit col-sm-6">
                <div className="editForm col-11">
                    <div className="myinput">
                        <label>账号：</label>
                        <input type="text" name="account"
                            value={account}
                            onChange={this.editChange}
                            placeholder="账号"
                            disabled={editStatus}
                            className="form-control"
                        />
                    </div>
                    <div className="myinput">
                        <label>邮箱：</label>
                        <input type="email" name="email"
                            value={email}
                            onChange={this.editChange}
                            placeholder="邮箱"
                            disabled={editStatus}
                            className="form-control"
                        />
                    </div>
                    <div className="myinput">
                        <label>密码：</label>
                        <input type="password" name="password"
                            value={password}
                            onChange={this.editChange}
                            placeholder="密码"
                            disabled={editStatus}
                            className="form-control"
                        />
                    </div>
                    <div className="toggleOperation">
                        <button className="btn btn-primary" onClick={this.activeEdit}>
                            <span className="fui-new"></span>&nbsp;&nbsp;编辑
                        </button>
                        <button className="btn btn-primary" onClick={this.activeSave}>
                            <span className="fui-upload"></span>&nbsp;&nbsp;保存
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
