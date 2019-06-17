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
    //api call example: http://api.openweathermap.org/data/2.5/forecast?q=tel%20aviv&APPID=e4063054bda92f3ca54619eb59a22adf
    const APPID ='e4063054bda92f3ca54619eb59a22adf';
    const q = this.state.search;
    const basePath = 'http://api.openweathermap.org/data/2.5/forecast';
    const str = `${basePath}?q=${q}&APPID=${APPID}`;
    let res  = await axios.get(str);
    this.setState({ searchRes:res.data });
    this.props.history.push({
      pathname: '/',
      search: `?city=${this.state.searchRes.city.name}`,
    })

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
                  <button className="btn btn-success mt-2" onClick={this.submitSearch}>
                    Search
                  </button>
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
