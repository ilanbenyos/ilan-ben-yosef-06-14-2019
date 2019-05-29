import React from 'react'
import List from './list'
import Form from "./form";

class Home extends React.Component {
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
                    <h2>Articles</h2>
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
export default Home
