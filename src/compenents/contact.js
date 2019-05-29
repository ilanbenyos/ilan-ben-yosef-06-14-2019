import React from 'react'
import queryString from 'query-string';

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pushToStr:'kkk',
            searchParams: queryString.parse(this.props.location.search),
            isShow: true,
            user:{
                name:'ilan',
                gender:'male'
            }
        };
    }

    // pushMe = () => {
    //     this.props.match.params.txt2 === 'kkk' ?'lll' :'kkk' ;
    //     this.props.history.push({ pathname: `/contact/${ this.state.pushToStr}`,
    //         search: '?foo=' + this.state.user.name
    //     })
    // };
    toggleShow = () => {
        this.setState(state => ({ isShow: !state.isShow }));
    };
    toggleGender = () => {
        this.setState(state => state.user.name = state.user.name === 'ilan' ? 'noam':'ilan');
        this.setState(state => state.user.gender = state.user.gender === 'male' ? 'female':'male');
    };

    render() {
        return (
        <div>
            <button onClick={this.toggleShow} type="button">
                Toggle Show
            </button>
            <button onClick={this.toggleGender} type="button">
                Toggle Gender
            </button>
            {/*<button onClick={this.pushMe}>={this.props.match.params.txt2}+++</button>;*/}
            <button onClick={this.props.onClick}>{this.props.text}</button>;
            {this.props.foo}
            <div>name={this.state.user.name}=</div>
            <div>gender={this.state.user.gender}=</div>
            <div>txt2={this.props.match.params.txt2}=</div>
            <div>searchParams={queryString.parse(this.props.location.search).foo}=</div>
            {this.state.isShow ?  <h3 >show</h3> : <h3 >no show</h3>}
        </div>


        );
    }
}
export default Contact
