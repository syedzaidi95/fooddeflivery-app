import React, { Component } from 'react';
import firebase from '../../../config/firebae';
import UserHeader from '../../../components/Header'
import TextField from '@material-ui/core/TextField';
import Footer from '../../../components/Footer';
import {connect} from 'react-redux'
import Chat from '../../../components/chat/chat'

class Resturant extends Component {
    constructor() {
        super();
        this.state = {
            resturant: [],
            catogeries: [],
            posts: [],
            searchBarValue: '',
            catogeryFilter: false,
            catogeryFilterValue: ''
        }
    }
    getCatogeryName(id) {
        const { catogeries } = this.state
        for (var key in catogeries) {
            if(key === id){
                        // return (`${catogeries[key].toUpperCase()}`)
                        // console.log(key)
                    }
                }
    }
    getData() {
        const {posts, searchBarValue, catogeryFilter} = this.state
        if (searchBarValue === '') {
            if (catogeryFilter) {

            } else {
                let data = [];
                for (var key in posts) {
                    for (var key2 in posts[key]) {
                                data.push(
                                        <div key={key2} style={{ width: 300 }}>
                                            <img style={{ width: '100%', height: 250 }} src={posts[key][key2].imageUrl} alt='' />
                                            <div style={{ textAlign: 'left' }}>
                                                <h3 style={{ margin: 0, padding: 0 }}>{this.getCatogeryName(key)}</h3>
                                                <p style={{ margin: 0, padding: 0 }}>{posts[key][key2].productName}</p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <h2 style={{ margin: 0, padding: 0 }}>RS. {posts[key][key2].price}</h2>
                                                <button
                                                id={key}
                                                className={posts[key][key2].productName} 
                                                style={{ cursor: 'pointer', border: '2px dashed black', color: 'black', background: 'none', width: 100, height: 40 }}
                                                onClick={(e) => {this.order(e)}}>
                                                        Order
                                                            </button>
                                                </div>
                                            </div>
                        )
                    }
                }
                return (data)
            }
        }
    }
    componentDidMount() {
        this.getResturant()
    }

    getResturant() {
        firebase.database().ref(`accounts/resturant/${this.props.location.state}`).on('value', (e) => {
            let resturant =  e.val()
            firebase.database().ref(`catogeries/${this.props.location.state}`).on('value', (e) => {
                let catogeries =  e.val()
                firebase.database().ref(`posts/${this.props.location.state}`).on('value', (e) => {
                    let posts =  e.val()
                    this.setState({ catogeries: catogeries, resturant: resturant, posts: posts })
                })
            })
        })
    }

    // renderResturantTimeLine(){
    //     const {resturant} = this.state
    //     if(resturant !== null){
    //         console.log(resturant)
    //     }
    // }
    getCatogeryBtn() {
        const { catogeries } = this.state
        let catogeryBtn = []
        if (catogeries !== null) {
            for (var key in catogeries) {
                console.log(catogeries[key])
                console.log(this.props)
                catogeryBtn.push(
                    <option key={key} value={key}>
                        {catogeries[key]}
                    </option>
                )
            }
            return (catogeryBtn)
        }
    }
    selector(e) {
        if (e.target.value !== 'null')
            this.setState({ catogeryFilterValue: e.target.value, catogeryFilter: true })
    }
    getCatogeryNameonh(e) {
        console.log(e)
        const { catogeries } = this.state;
        for (var key in catogeries) {
            console.log(catogeries[key])
            if (key === e) {
                return (catogeries[key].toUpperCase())
            }
        }
    }
    order(e){
        let order = {
            catogeryName: this.getCatogeryName(e.target.id),
            productName: e.target.className,
            userName: this.props.user.fullName,
        userLocation: this.props.user.location,
        resturantId: this.props.location.state,
        userId: this.props.user.uid,
        status: 'pending'
        }
        firebase.database().ref(`order/forRestaurant/${order.resturantId}/${order.userId}`).push(order).then(()=>{
            firebase.database().ref(`order/forUser/${order.userId}/${order.resturantId}`).push(order).then(()=>{
                alert('OrderDone')
            })
        })
    }
    render() {
        // console.log(this.props.location.state)
        return (
            <div style={{backgroundColor: 'white'}}>
                <UserHeader props={this.props} />
                <br />
                <div>
                <Chat />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <div style={{ paddingLeft: 60, paddingRight: 60, width: '50%' }}>
                        <TextField
                            id="outlined-full-width"
                            label="SearchBar"
                            // style={{ margin: 8 }}
                            onChange={(e) => { this.setState({ searchBarValue: e.target.value }) }}
                            value={this.state.searchBarValue}
                            placeholder="Search by Name"
                            // helperText="Full width!"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ width: '50%' }}>
                            <select style={{ width: 200, height: 50 }} onChange={(e) => { this.selector(e) }}>
                                <option value='null'>Catogery Filter</option>
                                {this.state.resturant !== null ? this.getCatogeryBtn() : ''}
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    {this.state.searchBarValue === '' && !this.state.catogeryFilter && <h3>Posts For You</h3>}
                    {this.state.searchBarValue === '' && this.state.catogeryFilter && <h3>{this.getCatogeryNameonh(this.state.catogeryFilterValue)}</h3>}
                    {this.state.searchBarValue !== '' && <h3>Search Result {this.state.catogeryFilter && `in ${this.getCatogeryNameonh(this.state.catogeryFilterValue)}`}</h3>}
                    <div style={{ display: 'flex', justifyContent: 'space-around', height: 800 }}>
                        {this.getData()}
                    </div>
                </div>
                <div>
                    <Footer />
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

export default connect(mapStateToProps)(Resturant)
