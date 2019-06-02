import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle, setUserName } from "../store/actions";

function mapDispatchToProps(dispatch) {
    return {
        setUserName: userName => dispatch(setUserName(userName)),
        addArticle: article => dispatch(addArticle(article)),
    };
}
class ConnectedForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            userName:'',
        };
    }
    handleChange=(event)=> {
        this.setState({ [event.target.id]: event.target.value });
    };
    handleSubmit=(event)=> {
        event.preventDefault();
        const { title,userName } = this.state;
        const id = uuidv1();
        this.props.addArticle({ title, id });
        this.setState({
            title: "",
        });
    };
    submitUserName=(event)=> {
        event.preventDefault();
        const { userName } = this.state;
        this.props.setUserName(userName);
        this.setState({
            userName:'',
        });
    }
    render() {
        const { title, userName } = this.state;
        return (
            <div className="forms">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>
            </form>
            <form onSubmit={this.submitUserName}>
                <div className="form-group">
                    <label htmlFor="userName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={userName}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>
            </form>
            </div>
        );
    }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
