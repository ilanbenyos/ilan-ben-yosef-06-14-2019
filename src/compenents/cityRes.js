import React from 'react';

class CityRes extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return  this.props && this.props.city?(
      <div>
        <div className="city-name">
          {this.props && this.props.city? this.props.city.city.name: ''}
        </div>
        <i className="material-icons text-danger"> favorite </i>
        <div> =={this.props.isFavorite?'1':'2222'}==</div>
      </div>
    ):
      <div className="city-name">NO DATA</div>
  }
}
export default CityRes

