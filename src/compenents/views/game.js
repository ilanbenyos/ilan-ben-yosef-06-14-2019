import React from 'react'
import { connect } from "react-redux";
import {setBoard} from "../../store/actions";

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
          imgSrc:[
            'https://cdn1.iconfinder.com/data/icons/angry-icons-by-femfoyou/512/whitebird.png',
            'http://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-blue-icon.png',
            'http://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-blue-icon.png',
            'https://banner2.kisspng.com/20180420/vfw/kisspng-angry-birds-stella-angry-birds-space-computer-icon-vector-birds-5ad9959cc17e82.7993739415242090527926.jpg',
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
      let str = this.getNeighbours(x,y)
      str= str.map(i=> {
        delete i.isSelected
        delete i.isInGame
        return i
      })
    // console.log(x,y);
    //   console.log(str);
    // console.log('eeeeee',x,y);
    // console.log(this.props.board[i][j]);
  }
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
          // let idx = this.getRandomArbitrary(0, arr.length-1)
          // let res =  arr[idx]
          // res.isLonely = true;
          // newBoard[i][j] = res
          // newBoard[x][y].isLonely = false;
        }else{
          newBoard[x][y].isLonely = true;

        }
      })
    });
    return newBoard
  }
  getNeighbours(x,y, board = this.props.board){
    let neighbours = []
    console.log(x,y,board[x][y].srcIdx,'yyyyyyyyyy');
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
        console.log( tempX, tempY,'-',board[tempX][tempY].srcIdx);
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
                <div key={xIdx} className={`square ${board[yIdx][xIdx].isLonely ? 'lonely':''}`}
                     onClick={() => {
                       this.clicked(xIdx, yIdx)
                     }}>
                  {xIdx}{yIdx}/{board[yIdx][xIdx].srcIdx}
                  {/*<img src={this.state.imgSrc[board[yIdx][xIdx].srcIdx]} alt=""/>*/}
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
