import React from 'react'
import board from "./board";

class gameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          answer:'',
        };
    }
  handleChange=(event)=> {
    this.setState({ answer: event.target.value });
  };
  handleAnswer=(event)=> {
    event.preventDefault();
    const { answer } = this.state;
    this.props.handleAnswer(answer);
    this.setState({
      answer:'',
    });
  };
  render() {
    const { answer } = this.state;
    const { currSelectedGroups, totalRight,totalWrong} = this.props;

    return(

    <div className="game-form border border-primary mt-3">
      {currSelectedGroups ?
        <div>
          <div className="d-flex flex-row">
              <div className="total bg-success h3 p-1 border rounded">{totalRight}{currSelectedGroups.length > 0 ?'+':null } </div>
            {currSelectedGroups.map((item, idx) =>
              <div className="item h3 p-1 border rounded"
                 key={idx}>{item.length}{idx === currSelectedGroups.length-1 ? '':'+' }
               </div>
            )}
            {totalWrong ?
              <div className="total-wrong ml-auto bg-danger h3 p-1 border rounded ">{totalWrong } </div>
            :null}
          </div>

        </div>
        :
        <div>no data</div>
      }
          <form onSubmit={this.handleAnswer}>
            <div className="form-group">
              <label>
              <input
                type="text"
                className="form-control"
                value={answer}
                onChange={this.handleChange}
              />
              </label>
            </div>
            <button type="submit" className="btn btn-success btn-lg">
              שלח!
            </button>
          </form>

        </div>

    )

  }
}

export default gameForm
