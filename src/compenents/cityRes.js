import React from 'react';

class CityRes extends React.Component {
  constructor(props) {
    super(props);

  }
  computedData(){
    const searchRes = this.props.searchRes;
    let arr = searchRes.list.map((item,idx)=>{
      const itemDate = new Date(item.dt * 1000)
      const time = `${('0' + itemDate.getHours()).slice(-2)}:${ ('0' + itemDate.getMinutes()).slice(-2)}`
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayOfWeek = weekday[itemDate.getDay()];
      const month = itemDate.getMonth()
      const date = `${itemDate.getDate()}/${month}`;
      return{
        temp:`${Math.floor(item.main.temp - 273)} C`,
        time,
        dayOfWeek,
        month,
        date,
        description :item.weather[0].description
      }

    })
    arr = arr.map((item,idx)=>{
      let isFirstOfDate =(idx === 0)? true: (arr[idx-1].dayOfWeek !== item.dayOfWeek);
      return {...item,isFirstOfDate};
    })
    return arr
  }
  handleClick=()=> {
    const {name, id} = this.props.searchRes.city;
    if(this.props.isFavorite){
      this.props.removeFromFavorites({id});
    }else{
      this.props.addToFavorites({name, id});
    }
  };
  render() {
    const searchRes = this.props.searchRes
      if(!searchRes) return <div className="city-name">NO DATA</div>
    const computedData = this.computedData()
    const items = computedData.map((item,idx) =>{
      return (
          <div key={idx} className="item d-flex flex-column">
            {item.isFirstOfDate ?
                <h4 className="upper mt-2 text-primary"> {item.date} - {item.dayOfWeek} </h4>: null
            }
            <div className="bottom d-flex">
            <div className="dt mr-2"> {item.time} </div>
            < div className="temp mr-2"> {item.temp} </div>
            <div className="desc mr-2">
              {item.description}
            </div>
            </div>
          </div>
        )
    });

    return (
      <div className="city-res mt-3">
        <h3 className="city-name text-center">
          {searchRes.city.name}
        </h3>
          {this.props.isFavorite?
            (<div className="d-flex justify-content-between align-center">
              <button className="btn btn-outline-info d-flex align-center"
              onClick={this.handleClick}
              > Remove from favorites
                <i className="material-icons text-danger ml-3"> favorite </i>
              </button>
            </div>)
            :
            (<div className="d-flex justify-content-between">
              <button
                onClick={this.handleClick}
                className="btn btn-outline-info d-flex align-center"> Add to favorites
                <i className="material-icons text-danger ml-3"> favorite </i>
              </button>

            </div>)
          }
        {items}

      </div>
    )
  }
}
export default CityRes

