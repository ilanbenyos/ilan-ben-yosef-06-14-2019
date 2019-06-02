import React from 'react'

class board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            'http://icons.iconarchive.com/icons/we4ponx/angry-birds-star-wars/128/Angry-Birds-Star-Wars-2-icon.png',
            'http://icons.iconarchive.com/icons/martin-berube/flat-animal/128/frog-icon.png',
          ],
        };
    }
  render() {
    const { board } = this.props;

    return(
        <div className="board px-3">
          {board.map((y, yIdx) =>
            <div className="row justify-content-center" key={yIdx}>
              {y.map((x, xIdx) =>
                <div key={xIdx}
                     className={
                       `square ${board[xIdx][yIdx].isSelected ?
                         `selected selected-${board[xIdx][yIdx].isSelected}`:''}
                         ${board[xIdx][yIdx].isLonely ? 'lonely':''}
                         ${board[xIdx][yIdx].answerStatus}`
                     }
                     onClick={() => {
                       this.props.onClick(xIdx, yIdx)
                     }}>
                  <img src={this.state.imgSrc[board[xIdx][yIdx].srcIdx]} alt=""/>
                </div>
              )}
            </div>
          )}
        </div>
    )

  }
}

export default board
