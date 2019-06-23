import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";



class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
            lng: '',
            lat: ''
        }
        this.updateState = this.updateState.bind(this)
    }
componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
         let lat = position.coords.latitude;
         let lng = position.coords.longitude
        this.setState({lat: lat, lng: lng})
        })

}
shouldComponentUpdate(nextProps, nextState){
    const {lng, lat} = this.state;
return(
    nextState.lng !== lng && nextState.lat !== lat
)
}
updateState(loc){
    this.setState({lat: loc.latLng.lat(), lng: loc.latLng.lng()})
}

    render() {
        const {lat, lng} = this.state
        const location = {
            lat,
            lng
        }
        this.props.func(location)
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    func={this.updateState}
                    location={location}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` , width: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
    >
        {<Marker onDragEnd={(loc)=>{props.func(loc)}} draggable={true} position={{ lat: props.location.lat, lng: props.location.lng }} />}
    </GoogleMap>
))

export default Map;
