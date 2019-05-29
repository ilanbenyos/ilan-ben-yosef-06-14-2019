import React from 'react'
import { connect } from "react-redux";

import List from './list'
import Form from "./form";
const mapStateToProps = state => {
    return { userName: state.userName };
};

class ConnectedHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureId: null,
            label: null
        };
    }

    render() {
        return(
            <div className="row mt-5">
                <div className="col-md-4 offset-md-1">
                    <h2>Home - {this.props.userName}</h2>
                    <List />
                </div>
                <div className="col-md-4 offset-md-1">
                    <h2>Add a new article</h2>
                    <Form />
                </div>
            </div>
        )

    }
}
const Home = connect(mapStateToProps)(ConnectedHome);

export default Home
