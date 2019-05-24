import React, { Component } from "react";
import "../../style/components/MyModal.css";
export default class MyModal extends Component {
    render() {
        const { status, head, text, handleTrue, handleFalse } = this.props;
        return (
            <div className={`mymodal modal ${status ? "modalShow" : ""}`}>
                <div className="modal-dialog myDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{head}</h4>
                            <button
                                onClick={handleFalse}
                                type="button"
                                className="close fui-cross"
                                data-dismiss="modal"
                                aria-hidden="true">
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{text}</p>
                        </div>
                        <div className="modal-footer">
                           {handleTrue?(<button className="btn btn-default btn-wide" onClick={handleTrue}>确认</button>):""}
                           {handleFalse?(<button className="btn btn-primary btn-wide" onClick={handleFalse}>取消</button>):""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}