import React from 'react'
import { connect } from "react-redux";
import axios from "axios"
import CityRes from "../cityRes"
import {addToFavorites , initFavorites, removeFromFavorites} from "../../store/actions";
import queryString from "query-string";

const mapStateToProps = state => {
    return { favorites: state.favorites };
};

function mapDispatchToProps(dispatch) {
  return {
    initFavorites: () => dispatch(initFavorites()),
    removeFromFavorites: id => dispatch(removeFromFavorites(id)),
    addToFavorites: favorite => dispatch(addToFavorites(favorite)),
  };
}

class ConnectedHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search:queryString.parse(this.props.location.search).city || 'tel aviv',
          searchRes:null,
        };
    }
  removeFromFavorites=(id)=> {
    this.props.removeFromFavorites(id);
    this.setState({
      search: "",
    });
  };
    addToFavorites=({name, id})=> {
    this.props.addToFavorites({name, id});
    this.setState({
      search: "",
    });
  };
    isFavorite(){
      if(!this.state.searchRes) return false;
      let res = this.props.favorites.find(i=> {
        return i.id === this.state.searchRes.city.id
      });
      return !!res;
    }
  componentDidMount() {
    this.props.initFavorites();
    this.submitSearch()
  }
  submitSearch= async ()=>{
    const q = this.state.search;
    const str = `?q=${q}`;
    this.pushSearch(str)


  };
  async pushSearch(str){
    const APPID ='e4063054bda92f3ca54619eb59a22adf';
    const basePath = 'http://api.openweathermap.org/data/2.5/forecast';
    const apiPath = `${basePath}${str}&APPID=${APPID}`;
    let res  = await axios.get(apiPath);
    this.setState({ searchRes:res.data });
    this.props.history.push({
      pathname: '/',
      search: `?city=${this.state.searchRes.city.name}`,
    })
    this.setState({ search:this.state.searchRes.city.name });

  }
  submitSearchLocation= async ()=>{
    navigator.geolocation.getCurrentPosition(
      async(position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const str = `?lat=${lat}&lon=${lon}`;
       this.pushSearch(str)
      }
    );
  };
    handleChange=(e)=> {
      this.setState({ search: e.target.value });
    };
    render() {
        return(
            <div className="row mt-5 pb-5">
                <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                  <div className="panel mt-2  d-flex ">
                    <button className="btn btn-success mr-2" onClick={this.submitSearch}>
                      Search
                    </button>
                    <button className="btn btn-primary d-flex align-center" onClick={this.submitSearchLocation}>
                      Search By Location
                      <i className="material-icons text-danger ml-3"> location_on </i>

                    </button>
                  </div>
                  <div className="result" >
                    <CityRes searchRes={this.state.searchRes}
                             removeFromFavorites={this.removeFromFavorites}
                             addToFavorites={this.addToFavorites}
                             isFavorite={this.isFavorite()}/>
                  </div>
                </div>
            </div>
        )
    }
}
const Home = connect(mapStateToProps,mapDispatchToProps)(ConnectedHome);

export default Home
