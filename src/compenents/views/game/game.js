import React from 'react'
import { connect } from "react-redux";
import {setBoard, addScore} from "../../../store/actions";
import _ from "lodash"
import GameForm from "./gameForm"
import Board from "./board"


const mapStateToProps = state => {
    return {
      score: state.score,
      board: state.board,
      userName: state.userName,
    };
};
function mapDispatchToProps(dispatch) {
  return {
    addScore: scoreToAdd => dispatch(addScore(scoreToAdd)),
    setBoard: newBoard => dispatch(setBoard(newBoard)),
  };
}

class connectedGame extends React.Component {
  currSelectedGroup=[]

  constructor(props) {
        super(props);
        this.state = {
          markedGroups:[],
          currSelectedGroups:[],
          currSelectedGroup:[],
          xLen:3,
          yLen:3,
          maxNum:3,
          totalWrong:0,
          totalRight:0,

        };
    }
  handleAnswer=(userInput)=>{
    let newBoard = _.cloneDeep(this.props.board);

    let chosenSquares = this.state.currSelectedGroups.reduce((acc,curr)=>{
      return acc+curr.length
    },0);
    let correctRes = chosenSquares + this.state.totalRight;
    let obj={
      isSelected:false,
      answerStatus:'status-wrong'
    };
    if(correctRes === +userInput){
      obj.answerStatus = 'status-right'
      this.setState({
        totalRight: correctRes,
      });
      this.props.addScore(chosenSquares);
    }else{
      this.setState({
        totalWrong: this.state.totalWrong + chosenSquares,
      });
    }
    this.state.currSelectedGroups.forEach((row)=>{
      row.forEach((sq)=> {
        newBoard[sq.x][sq.y] = {...sq,...obj}
      })
    });
    this.props.setBoard({newBoard});
    this.setState({
      currSelectedGroups: [],
    });

  };
  componentDidUpdate(){
    let totalSquares = this.state.xLen * this.state.yLen
    if(this.state.totalRight === totalSquares){
      this.props.addScore(this.state.yLen);
      this.nextStage()
    }else if(this.state.totalWrong + this.state.totalRight === totalSquares){
      this.refreshStage()
    }
  }
  refreshStage(){
    this.setState({
      markedGroups:[],
      currSelectedGroups:[],
      currSelectedGroup:[],
      totalWrong:0,
      totalRight:0,
    },()=>this.initBoard());
  }
  nextStage(){
    this.setState({
      yLen: this.state.yLen +1,
      xLen: this.state.xLen +1,
      maxNum: this.state.maxNum +1,
      markedGroups:[],
      currSelectedGroups:[],
      currSelectedGroup:[],
      totalWrong:0,
      totalRight:0,
    },()=>this.initBoard());
  }
  clicked=(x,y)=> {
      this.markGroup(x,y)
  };
  getRandomArbitrary(min=0, max = this.state.maxNum) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  initSquare(){
      return {
        srcIdx: this.getRandomArbitrary(),
        isSelected:false,
        answerStatus:'status-init',//'init'/false/true
        isLonely:false,
      }
  }
  initBoard(){
    let newBoard = [];
    for(let x = 0; x<this.state.xLen; x++){
      newBoard[x]=[];
      for(let y = 0;y<this.state.xLen; y++){
        newBoard[x][y] = {...this.initSquare(),x,y}
      }
    }
    newBoard = this.markLonely(newBoard);
    this.props.setBoard({newBoard});
  }
  async componentDidMount(){
   this.initBoard()
  }
  markLonely(newBoard){
    newBoard.forEach((row,x)=> {
      row.forEach((sq, y) => {
        let arr = this.getNeighbours(x,y,newBoard)
        let sqr = newBoard[x][y]
        if (arr.some(sq => sq.srcIdx === sqr.srcIdx)) {
          newBoard[x][y].isLonely = false;
        }else{
          let rand = this.getRandomArbitrary(0,arr.length-1)
          let srcIdx = arr[rand].srcIdx
          newBoard[x][y].srcIdx = srcIdx;
        }
      })
    });
    return newBoard
  }
  markNeighbours(x,y, board) {
    const square = board[x][y];
    if(square.isSelected)return;
    board[x][y].isSelected = this.state.currSelectedGroups.length + 1;
    let item = board[x][y]
    this.currSelectedGroup.push(item)
    let arr = this.getNeighbours(x, y, board);
    let filtered = this.filterSimilar(square.srcIdx,arr);
    filtered.forEach(sq=> {
        this.markNeighbours(sq.x, sq.y, board)
    })
  }
  filterSimilar(srcIdx,arr){
    return arr.filter(item=> item.srcIdx === srcIdx)
  }

  markGroup(x,y){
    let newBoard = _.cloneDeep(this.props.board);

    this.markNeighbours(x,y,newBoard)
    if(this.currSelectedGroup.length> 0) {
      this.props.setBoard({newBoard});
      this.setState({
        currSelectedGroups: [...this.state.currSelectedGroups, this.currSelectedGroup],
      });
      this.currSelectedGroup = [];
    }
  }
  getNeighbours(x,y, board = this.props.board){
    let neighbours = []
    for(let tempX= x-1;tempX <= x+1; tempX++) {
      for (let tempY = y - 1; tempY <= y + 1; tempY ++) {
        if (y === tempY && x === tempX) continue;//not the same square
        if (tempY < 0 || tempY > this.state.xLen -1) continue;//not outside of board
        if (tempX < 0 || tempX > this.state.yLen -1) continue;//not outside of board
        let o = board[tempX][tempY];
        let res = {
          ...this.initSquare(),
          y: tempY,
          x: tempX,
          srcIdx: o.srcIdx
        };
        neighbours.push(res)
      }
    }
    return neighbours
  }
  render() {
    const { currSelectedGroups, totalRight, totalWrong} = this.state;
    const { board } = this.props;

    return(
      <div className="game mt-5">
        <div className="score d-inline-block h3 p-2 rounded bg-warning">{this.props.score}</div>
         {board && <Board onClick={this.clicked} board={board}/>}
        {board && <GameForm handleAnswer={this.handleAnswer}
                            totalWrong={totalWrong}
                            totalRight={totalRight}
          currSelectedGroups={currSelectedGroups}
        />}
      </div>
    )

  }
}
const Game = connect(mapStateToProps, mapDispatchToProps)(connectedGame);

export default Game
