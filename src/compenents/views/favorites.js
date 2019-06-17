import React from 'react'
import { connect } from "react-redux";
import axios from "axios";
import {initFavorites} from "../../store/actions";


const mapStateToProps = state => {
  return { favorites: state.favorites };
};
function mapDispatchToProps(dispatch) {
  return {
    initFavorites: () => dispatch(initFavorites()),
  };
}

class ConnectedFavorites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          favoritesObj: null,
        };
    }
    async componentDidMount() {
      await this.props.initFavorites();
      const APPID ='e4063054bda92f3ca54619eb59a22adf';
      const basePath = 'http://api.openweathermap.org/data/2.5/weather';

      let multiP = this.props.favorites.map(async i=> {
        const str = `${basePath}?id=${i.id}&APPID=${APPID}`;
        return  axios.get(str);
      });
      let res = await Promise.all(multiP);
      const favoritesObj = res.map(i=> i.data)
      this.setState({ favoritesObj });

    }
    pushToCity(name){
      this.props.history.push({
        pathname: '/',
        search: `?city=${name}`,
      })
    }
    getItems(){
      const favoritesObj = this.state.favoritesObj;
      if(!favoritesObj)return [];
      return favoritesObj.map((item,idx) => {
        return (
          <div key={idx}
               className="list-group-item list-group-item-action rol-btn"
               onClick={()=>this.pushToCity(item.name)}>
            <h5 className="name mr-2 text-center text-success">{item.name}</h5>
            <div className="bottom d-flex justify-content-between align-center">
              <div className="temp">{Math.floor(item.main.temp - 273)} C</div>
              <div className="description mr-2">{item.weather[0].description}</div>
            </div>
          </div>);
      })
    }
    render() {
        return (
        <div>
          <h3 className="my-favorites text-primary mb-3">My Favorites</h3>
          <div className="list-group">
            {this.getItems()}
          </div>
        </div>
        );
    }
}

const Favorites = connect(mapStateToProps, mapDispatchToProps)(ConnectedFavorites);

export default Favorites
