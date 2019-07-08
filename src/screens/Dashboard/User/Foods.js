import React , {Component} from 'react';
import firebase from '../../../config/firebae';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';


class Foods extends Component{
    constructor(){
        super();
        this.state = {
            resturants : null,
            catogeries : null,
            posts : null,
            searchField: '',
            nameSearch: true,
            catogeryFilter: false,
            filterValue: '',

        }
    }


    componentWillMount() {
        this.getResturants()
    }
    getResturants() {
        firebase.database().ref(`accounts/resturant`).on('value', (e) => {
            let resturants = e.val()
            if (resturants !== null) {
                firebase.database().ref(`catogeries`).on('value', (e) => {
                    let catogeries = e.val()
                    if (catogeries !== null) {
                        firebase.database().ref(`posts`).on('value', (e)=>{
                            let posts = e.val();
                            if(posts !== null){
                                this.setState({posts: posts})
                            }
                        })
                        this.setState({ catogeries: catogeries })
                    }
                })
                this.setState({ resturants: resturants })
            }
        })
    }
    getCatogeryName(id){
        const { catogeries } = this.state
        for(let key in catogeries){
            for(let key2 in catogeries[key]){
                if(key2 === id){
                    return(`${catogeries[key][key2].toUpperCase()}`)
                }
            }
        }
    }
    getCatogeryNamesOption(){
        const { catogeries } = this.state
        let optionDiv = []
        let option = []
        for(let key in catogeries){
            for(let key2 in catogeries[key]){
                if(option.indexOf(catogeries[key][key2].toLowerCase()) === -1){
                    option.push(catogeries[key][key2].toLowerCase())
                }
            }
        }
        for(let key in option){
            optionDiv.push(
                <option key={key} value={option[key]}>{option[key].toUpperCase()}</option>
            )
        }
        return(optionDiv)
    }
    getPosts(){
    const {posts, searchField, nameSearch, catogeryFilter, filterValue} = this.state;
    if(searchField === '' && !catogeryFilter){
        let postDiv = [];
        for(let key in posts){
            for(let key2 in posts[key]){
                for(let key3 in posts[key][key2])
                postDiv.push(
                    <div key={key3} style={{width: 300}}>
                            <img style={{width: '100%', height: 250}} src={posts[key][key2][key3].imageUrl} alt='' />
                            <div style={{textAlign: 'left'}}>
                            <h3 style={{margin: 0, padding: 0}}>{this.getCatogeryName(key2)}</h3>
                            <p style={{margin: 0, padding: 0}}>{posts[key][key2][key3].productName}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <h2 style={{margin: 0, padding: 0}}>RS. {posts[key][key2][key3].price}</h2>
                                <button id={key2} value={key} className={posts[key][key2][key3].productName} style={{cursor: 'pointer', border: '2px dashed black', color: 'black', background: 'none', width: 100, height: 40}}
                                onClick={(e)=>{this.orders(e)}}>
                                    Order
                                </button>
                            </div>
                        </div>
                    )
                }
            }
            return(postDiv)
        }
        else if(searchField !== '' && nameSearch && !catogeryFilter){
            let postDiv = [];
            for(let key in posts){
                for(let key2 in posts[key]){
                    for(let key3 in posts[key][key2])
                    if(posts[key][key2][key3].productName.toLowerCase().startsWith(searchField.toLowerCase())){
                        postDiv.push(
                            <div key={key3} style={{width: 300}}>
                                <img style={{width: '100%', height: 250}} src={posts[key][key2][key3].imageUrl} alt='' />
                                <div style={{textAlign: 'left'}}>
                                <h3 style={{margin: 0, padding: 0}}>{this.getCatogeryName(key2)}</h3>
                                <p style={{margin: 0, padding: 0}}>{posts[key][key2][key3].productName}</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <h2 style={{margin: 0, padding: 0}}>RS. {posts[key][key2][key3].price}</h2>
                                    <button id={key2} value={key} className={posts[key][key2][key3].productName} style={{cursor: 'pointer', border: '2px dashed black', color: 'black', background: 'none', width: 100, height: 40}}
                                    onClick={(e)=>{this.orders(e)}}>
                                        Order
                                    </button>
                                </div>
                            </div>
                        )
                    }
                }
            }
            return(postDiv)
        }
        else if(searchField !== '' && !nameSearch && !catogeryFilter){
            let postDiv = [];
            for(let key in posts){
                for(let key2 in posts[key]){
                    for(let key3 in posts[key][key2])
                    if(this.getCatogeryName(key2).toLowerCase().startsWith(searchField.toLowerCase())){
                        postDiv.push(
                            <div key={key3} style={{width: 300}}>
                                <img style={{width: '100%', height: 250}} src={posts[key][key2][key3].imageUrl} alt='' />
                                <div style={{textAlign: 'left'}}>
                                <h3 style={{margin: 0, padding: 0}}>{this.getCatogeryName(key2)}</h3>
                                <p style={{margin: 0, padding: 0}}>{posts[key][key2][key3].productName}</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <h2 style={{margin: 0, padding: 0}}>RS. {posts[key][key2][key3].price}</h2>
                                    <button id={key2} value={key} className={posts[key][key2][key3].productName} style={{cursor: 'pointer', border: '2px dashed black', color: 'black', background: 'none', width: 100, height: 40}}
                                    onClick={(e)=>{this.orders(e)}}>
                                        Order
                                    </button>
                                </div>
                            </div>
                        )
                    }
                }
            }
            return(postDiv)
        }
        else if(searchField === '' && catogeryFilter){
            let postDiv = [];
            for(let key in posts){
                for(let key2 in posts[key]){
                    for(let key3 in posts[key][key2])
                    if(this.getCatogeryName(key2).toLowerCase().startsWith(filterValue.toLowerCase())){
                        postDiv.push(
                            <div key={key3} style={{width: 300}}>
                                <img style={{width: '100%', height: 250}} src={posts[key][key2][key3].imageUrl} alt='' />
                                <div style={{textAlign: 'left'}}>
                                <h3 style={{margin: 0, padding: 0}}>{this.getCatogeryName(key2)}</h3>
                                <p style={{margin: 0, padding: 0}}>{posts[key][key2][key3].productName}</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <h2 style={{margin: 0, padding: 0}}>RS. {posts[key][key2][key3].price}</h2>
                                    <button id={key2} value={key} className={posts[key][key2][key3].productName} style={{cursor: 'pointer', border: '2px dashed black', color: 'black', background: 'none', width: 100, height: 40}}
                                    onClick={(e)=>{this.orders(e)}}>
                                        Order
                                    </button>
                                </div>
                            </div>
                        )
                    }
                }
            }
            return(postDiv)
        }
        else if(searchField !== '' && catogeryFilter){
            let postDiv = [];
            for(let key in posts){
                for(let key2 in posts[key]){
                    for(let key3 in posts[key][key2])
                    if(this.getCatogeryName(key2).toLowerCase().startsWith(filterValue.toLowerCase())){
                        if(posts[key][key2][key3].productName.toLowerCase().startsWith(searchField.toLowerCase()))
                        postDiv.push(
                            <div key={key3} style={{width: 300}}>
                                <img style={{width: '100%', height: 250}} src={posts[key][key2][key3].imageUrl} alt='' />
                                <div style={{textAlign: 'left'}}>
                                <h3 style={{margin: 0, padding: 0}}>{this.getCatogeryName(key2)}</h3>
                                <p style={{margin: 0, padding: 0}}>{posts[key][key2][key3].productName}</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <h2 style={{margin: 0, padding: 0}}>RS. {posts[key][key2][key3].price}</h2>
                                    <button id={key2} value={key} className={posts[key][key2][key3].productName} style={{cursor: 'pointer', border: '2px dashed black', color: 'black', background: 'none', width: 100, height: 40}}
                                    onClick={(e)=>{this.orders(e)}}>
                                        Order
                                    </button>
                                </div>
                            </div>
                        )
                    }
                }
            }
            return(postDiv)
        }
    }
    orders(e){
        let order = {
            catogeryName:  this.getCatogeryName(e.target.id),
            productName: e.target.className,
            userName: this.props.user.fullName,
        userLocation: this.props.user.location,
        resturantId: e.target.value,
        userId: this.props.user.uid,
        status: 'pending'
        }
        firebase.database().ref(`order/forRestaurant/${order.resturantId}/${order.userId}`).push(order).then(()=>{
            firebase.database().ref(`order/forUser/${order.userId}/${order.resturantId}`).push(order).then(()=>{
                alert('OrderDone')
            })
        })
    }
    render(){
        const {searchField, nameSearch, catogeryFilter} = this.state
        // console.log(this.props.props.history)
        return(
            <div style={{color: 'black', height: '800px', padding: 40, paddingTop: 10,}}>
                <h3>
                The easiest way to find & order your favourite food
                </h3>
                <TextField
                    id="outlined-full-width"
                    label={nameSearch ? 'Search By Name' : 'Search By Catogery'}
                    value={searchField}
                    onChange={(e)=>{this.setState({searchField: e.target.value})}}
                    margin="normal"
                    letiant="outlined"
                />
                {!catogeryFilter && <button style={{ cursor: 'pointer',border: '2px dashed black', background: 'none',height: 50, marginTop: 20, marginLeft: 10 }} onMouseOut={(e)=>{e.target.style.color = 'black'}} onMouseOver={(e)=>{e.target.style.color = 'red'}} onClick={()=>{this.setState({nameSearch: !nameSearch})}}>{nameSearch ? 'By Catogery' : 'By Name'}</button>}
                <select style={{ cursor: 'pointer',border: '2px dashed black', background: 'none',height: 50, marginTop: 20, marginLeft: 10 }} onMouseOut={(e)=>{e.target.style.color = 'black'}} onMouseOver={(e)=>{e.target.style.color = 'red'}} onChange={(e)=>{e.target.value !== 'null' ? this.setState({catogeryFilter: true, nameSearch: true,filterValue: e.target.value}) : this.setState({catogeryFilter: false,filterValue: ''})}}>
                    <option value='null'>Select Catogery Filter</option>
                    {this.getCatogeryNamesOption()}
                </select>
                <div style={{height: 700 ,display: 'flex', alignItems: 'row', flexFlow: 'row wrap', justifyContent: 'space-around',overflow: 'auto'}}>
                {this.state.posts !== null && this.getPosts()}
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

export default connect(mapStateToProps)(Foods)
