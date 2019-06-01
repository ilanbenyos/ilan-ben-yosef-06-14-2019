import React from 'react'
import { connect } from "react-redux";
import {setBoard} from "../../../store/actions";
import _ from "lodash"
const mapStateToProps = state => {
    return {
      board: state.board,
      userName: state.userName,
    };
};
function mapDispatchToProps(dispatch) {
  return {
    setBoard: newBoard => dispatch(setBoard(newBoard)),
  };
}

class ConnectedHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          markedGroups:[],
          currSelectedLength:0,
          imgSrc:[
            'https://cdn1.iconfinder.com/data/icons/angry-icons-by-femfoyou/512/whitebird.png',
            'http://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-blue-icon.png',
            'http://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-yellow-icon.png',
            'https://i0.wp.com/gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Cartoons-PNG/Red%20Bird%20The%20Angry%20Birds%20Movie%20PNG%20Transparent%20Image.png?m=1462570648',
            'http://icons.iconarchive.com/icons/martin-berube/flat-animal/128/horse-icon.png',
            'http://icons.iconarchive.com/icons/iconka/tailwaggers/128/dog-pug-icon.png',
            'http://icons.iconarchive.com/icons/iconka/tailwaggers/128/dog-rich-icon.png',
            'http://icons.iconarchive.com/icons/iconka/tailwaggers/128/dog-shepherd-icon.png',
            'http://icons.iconarchive.com/icons/arrioch/birdie-adium/128/Adium-Bird-Awake-icon.png',
            'http://icons.iconarchive.com/icons/martin-berube/flat-animal/128/frog-icon.png',
          ],
           xLen:9,
            yLen:9,
            maxNum:4,

        };
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
        isInGame:true,
        isLonely:false,
      }
  }
  async componentDidMount(){
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
  markLonely(newBoard){
    newBoard.forEach((row,x)=> {
      row.forEach((sq, y) => {
        let arr = this.getNeighbours(x,y,newBoard)
        let sqr = newBoard[x][y]
        if (arr.some(sq => sq.srcIdx === sqr.srcIdx)) {
          newBoard[x][y].isLonely = false;
        }else{
          newBoard[x][y].isLonely = true;
        }
      })
    });
    return newBoard
  }
  markNeighbours(x,y, board) {
    const square = board[x][y];
    if(square.isSelected)return;
    board[x][y].isSelected = true;
    this.setState({
      currSelectedLength: this.state.currSelectedLength ++,
    });

    let arr = this.getNeighbours(x, y, board)
    let filtered = this.filterSimilar(square.srcIdx,arr)
    filtered.forEach(sq=> {
        this.markNeighbours(sq.x, sq.y, board)
    })
  }
  filterSimilar(srcIdx,arr){
    return arr.filter(item=> item.srcIdx === srcIdx)
  }
  markGroup(x,y){
    let newBoard = _.cloneDeep(this.props.board)
    this.markNeighbours(x,y,newBoard)
    this.props.setBoard({newBoard});

    this.setState({
      currSelectedLength: 0,
      markedGroups:[...this.state.markedGroups,this.state.currSelectedLength]
    });
  }
  getNeighbours(x,y, board = this.props.board){
    let neighbours = []
    for(let tempX= x-1;tempX <= x+1; tempX++) {
      for (let tempY = y - 1; tempY <= y + 1; tempY ++) {
        if (y === tempY && x === tempX) continue;//not the same square
        if (tempY < 0 || tempY > this.state.xLen -1) continue;//not outside of board
        if (tempX < 0 || tempX > this.state.yLen -1) continue;//not outside of board
        let o = board[tempX][tempY];
        if(!o) debugger
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
    const { board } = this.props;

    return(
      <div className="game mt-5">
        <div>my name: {this.props.userName}</div>
         {board &&
        <div className="board">
          {board.map((y, yIdx) =>
            <div className="row" key={yIdx}>
              {y.map((x, xIdx) =>
                <div key={xIdx}
                     className={
                       `square ${board[xIdx][yIdx].isSelected ? 'selected':''} ${board[xIdx][yIdx].isLonely ? 'lonely':''}`
                     }
                     onClick={() => {
                       this.clicked(xIdx, yIdx)
                     }}>
                  {/*<div className={'position-absolute'}>{xIdx}{yIdx}/{board[xIdx][yIdx].srcIdx}</div>*/}
                  <img src={this.state.imgSrc[board[xIdx][yIdx].srcIdx]} alt=""/>
                </div>
              )}
            </div>
          )}
        </div>
      }
      </div>
    )

  }
}
const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Game
