import React from 'react'
import { connect } from "react-redux";
import _ from "lodash"
import axios from "axios"
import CityRes from "../cityRes"
import {addFavorite , initFavorites} from "../../store/actions";

const mapStateToProps = state => {
    return { favorites: state.favorites };
};

function mapDispatchToProps(dispatch) {
  return {
    initFavorites: () => dispatch(initFavorites()),
    addFavorite: favorite => dispatch(addFavorite(favorite)),
  };
}


class ConnectedHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search:'Tel aviv',
          searchRes:null,
        };
    }
  addToFavorites=()=> {
    const {name, id} = this.state.searchRes.city;
    this.props.addFavorite({name, id});
    this.setState({
      search: "",
    });
  };
    isFavorite(){
      if(!this.state.searchRes) return false;
      let res = this.props.favorites.find(i=> {
        console.log(this.state.searchRes.city.id);
        return i.id === this.state.searchRes.city.id
      })
      // console.log(res);
      return res;
    }
  componentDidMount() {
    this.props.initFavorites()
  }
  submitSearch= async ()=>{
    //api call example: http://api.openweathermap.org/data/2.5/forecast?q=tel%20aviv&APPID=e4063054bda92f3ca54619eb59a22adf
    const APPID ='e4063054bda92f3ca54619eb59a22adf';
    const q = this.state.search;
    const basePath = 'http://api.openweathermap.org/data/2.5/forecast';
    const str = `${basePath}?q=${q}&APPID=${APPID}`;
    let res  = await axios.get(str);
    this.setState({ searchRes:res.data });

  };
    handleChange=(e)=> {
      // _.debounce(this.submitSearch, 250);
      this.setState({ search: e.target.value });
    };
    render() {
        return(
            <div className="row mt-5">
                <div className="col-md-4 offset-md-1">
                    <h2>Home</h2>
                  <h3>{this.props.favorites.length}==</h3>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                  <button className="btn btn-success mt-2 mr-2"
                          disabled={!this.state.searchRes}
                          onClick={this.addToFavorites}>
                    Add To Favorites
                  </button>
                  <button className="btn btn-success mt-2" onClick={this.submitSearch}>
                    Search
                  </button>
                  <div className="result" >
                    <CityRes city={this.state.searchRes} isFavorite={this.isFavorite()}/>
                  </div>
                </div>
            </div>
        )

    }
}
const Home = connect(mapStateToProps,mapDispatchToProps)(ConnectedHome);

export default Home
