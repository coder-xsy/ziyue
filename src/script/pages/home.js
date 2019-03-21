import React,{ Component } from 'react';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>homepage</h1>
                <h2>
                    <Link to ="/watchPage/02">react-bootstrap</Link>
                </h2>
            </div>
        );
    }
}
