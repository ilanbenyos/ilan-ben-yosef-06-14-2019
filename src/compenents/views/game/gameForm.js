import React from 'react'

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
          <form onSubmit={this.handleAnswer} className="d-flex flex-column justify-content-center mx-4">
            <div className="form-group d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                value={answer}
                onChange={this.handleChange}
              />
              {/*<div className="input-group-append" onClick={this.handleAnswer}>*/}
                {/*<span className="input-group-text" id="basic-addon2">שלח!</span>*/}
              {/*</div>*/}
              <button type="submit" className="btn btn-success input-group-append">
                <span className="input-group-text">שלח!</span>
              </button>
            </div>

          </form>

        </div>

    )

  }
}

export default gameForm
