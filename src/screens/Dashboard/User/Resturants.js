import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './restaurant.css'
import image from '../../../Images/home.jpg'
import firebase from '../../../config/firebae'
import { connect } from 'react-redux'

class Restaurants extends Component {
    constructor() {
        super()
        this.state = {
            resturant: null,
            catogeries: null,
            searhField: ''
        }
    }

    componentWillMount() {
        this.getResturants()
    }
    getResturants() {
        firebase.database().ref(`accounts/resturant`).on('value', (e) => {
            let resturant = e.val()
            if (resturant !== null) {
                firebase.database().ref(`catogeries`).on('value', (e) => {
                    let catogeries = e.val()
                    if (catogeries !== null) {
                        this.setState({ catogeries: catogeries })
                    }
                })
                this.setState({ resturant: resturant })
            }
        })
    }
    getResturantsRender() {
        const { resturant, catogeries, searhField } = this.state
        if(resturant !== null && searhField === ''){
            let resturantsDiv = []
            for (var key in resturant) {
                resturantsDiv.push(
                    <div key={key} style={{border: '1px solid #748796', padding: 10, width: 500, height: 100, display: 'flex',marginBottom: 10 }}>
                        <div >
                            <img src={image} alt='asdl' style={{ height: 100, width: 100}} />
                        </div>
                        <div style={{textAlign: 'left', marginLeft: 10, width: 300 }}>
                            <h2 style={{ margin: 0}}>{resturant[key].resturantName}</h2>
                            <p style={{ margin: 0}}>{catogeries !== null ? this.getCatogeryDiv(key) : 'No Catogery Provided'}</p>
                            <p style={{ margin: 0}}>Rating</p>
                        </div>
                            <button id={key} onClick={(e)=>{this.props.props.history.push('/resturantPage', e.target.id)}} style={{height: 40, width: 100, marginTop: 20, border: '2px dashed black', background: 'none', color: 'black', cursor: 'pointer'  }}>Open</button>
                    </div>
                )
            }
            return (resturantsDiv)
        }
        else if(resturant !== null && searhField !== ''){
            let resturantsDiv = []
            for (let key in resturant) {
                if(resturant[key].resturantName.toLowerCase().startsWith(searhField.toLowerCase())){
                    resturantsDiv.push(
                        <div key={key} id={key} onClick={(e)=>{this.props.props.history.push('/resturantPage', e.target.id)}} style={{border: '1px solid #748796', padding: 10, width: 500, height: 100, display: 'flex', marginBottom: 10 }}>
                        <div>
                            <img src={image} alt='asdl' style={{ height: 100, width: 100 }} />
                        </div>
                        <div style={{ textAlign: 'left', marginLeft: 10, width: 300 }}>
                            <h2 style={{ margin: 0 }}>{resturant[key].resturantName}</h2>
                            <p style={{ margin: 0 }}>{catogeries !== null ? this.getCatogeryDiv(key) : 'No Catogery Provided'}</p>
                            <p style={{ margin: 0 }}>Rating</p>
                        </div>
                        <button id={key} onClick={(e)=>{this.props.props.history.push('/resturantPage', e.target.id)}}  style={{height: 40, width: 100, marginTop: 20, border: '2px dashed black', background: 'none', color: 'black', cursor: 'pointer'  }}>Open</button>
                    </div>
                )
            }
            }
            return (resturantsDiv)
        }
    }
    getCatogeryDiv(id) {
        const { catogeries } = this.state
        let catogeryDiv = []
        for (var key in catogeries) {
            if (key === id) {
                for (var key2 in catogeries[key]) {
                    catogeryDiv.push(catogeries[key][key2].toUpperCase())
                }
                return (catogeryDiv.join(' , '))
            }
        }


    }
    // getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //     var R = 6371; // Radius of the earth in km
    //     var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    //     var dLon = this.deg2rad(lon2-lon1); 
    //     var a = 
    //       Math.sin(dLat/2) * Math.sin(dLat/2) +
    //       Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    //       Math.sin(dLon/2) * Math.sin(dLon/2)
    //       ; 
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    //     var d = R * c; // Distance in km
    //     return d;
    //   }
      
    //   deg2rad(deg) {
    //     return deg * (Math.PI/180)
    //   }

    render() {
        console.log(this.props.user.location)
        const {searhField} = this.state
        return (
            <div style={{color: 'black', height: '80vh', padding: 40, paddingTop: 10 }}>
                <TextField
                    id="outlined-full-width"
                    label="Search by Name"
                    value={searhField}
                    onChange={(e)=>{this.setState({searhField: e.target.value})}}
                    margin="normal"
                    variant="outlined"
                />
                <button className='btnn'>Near By Restaurants</button>
                <button className='btnn' >Top Rating Restaurants</button>
                <div style={{ height: 400, overflow: 'auto' }}>
                {searhField === '' ? <h3>Restaurants</h3> : <h3>Search Result</h3>}
                    <div style={{ display: 'flex', alignItems: 'row', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                        {this.state.resturant !== null && this.getResturantsRender()}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}

export default connect(mapStateToProps)(Restaurants)