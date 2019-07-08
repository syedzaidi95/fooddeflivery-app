import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../../config/firebae'
import TextField from '@material-ui/core/TextField';


class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            catogeriesOption: [],
            catogeryKey: '',
            productName: '',
            price: '',
            image: '',
            catogery: '',
        }
    }
    componentDidMount() {
        firebase.database().ref(`catogeries/${this.props.user.uid}`).on('value', (e) => {
            let catogeries = []
            let catData = e.val()
            console.log(catData)
            for (var key in catData) {
                catogeries.push(
                    { value: key, label: catData[key] }
                )
            }
            this.setState({ catogeriesOption: catogeries })
        })
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    handleFileInput(e){
        const name = e.target.name;
        const file = e.target.files[0]
        this.setState({[name]: file})
    }
    uploadPost(){
        const {catogeryKey, productName, price, image} = this.state
        let date = new Date()
        let timeStamp = date.getTime()
        if(catogeryKey !== 'null' && productName !== '' && price !== '' && image !== ''){
            let postObj = {
                productName,
                price,
            }
            firebase.storage().ref(`${this.props.user.uid}/${catogeryKey}`).child(`${timeStamp}`).put(image).then((e)=>{
                e.ref.getDownloadURL().then((url)=>{
                    postObj.imageUrl = url
                    postObj.imageName = e.metadata.name
                    firebase.database().ref(`posts/${this.props.user.uid}/${catogeryKey}`).push(postObj).then((e)=>{
                        alert('your post is added')
                    })
                })
            })
        }
    }
    addCatogery(){
        const { catogery } = this.state;
        let uid = this.props.user.uid;
        firebase.database().ref(`catogeries/${uid}`).push(catogery).then(()=>{
            this.setState({catogery: ''})
        }).then(()=>{
            alert('Catogery added')
        })
    }
    render() {
        console.log(this.props)
        const { catogeriesOption, productName, price , catogery} = this.state

        return (
            <div style={{ color: 'black' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                    id="outlined-full-width"
                    label='Add New Catogery'
                    onChange={(e)=>{this.handleUserInput(e)}}
                    value={catogery}
                    name='catogery'
                    margin="normal"
                    variant="outlined"
                />
                    <button onClick={()=>{this.addCatogery()}} style={{marginTop: 20 ,cursor: 'pointer', border: '2px dashed black', background: 'none', color: 'black', height: 50, width: 100 }}>
                        Add
                </button>
                </div>
                <hr />
                <p style={{backgroundColor: 'grey', color: 'white', boxShadow: '0px 0px 5px 5px black'}}>If You Want Add Post in Old Catogery select Catogery and add post</p>
                <hr />
                <div style={{ boxShadow: 'inset 0px 0px 5px black', width: 400, margin: '20px auto', padding: 30}}>
                <div>
                    <select onChange={(e)=>{this.setState({catogeryKey: e.target.value})}} style={{ width: 300, height: 40 }}>
                        <option value='null'>Select Catogery</option>
                        {catogeriesOption.length && catogeriesOption.map((e) => {
                            return (
                                <option key={e.value} value={e.value} >{e.label}</option>
                            )
                        })}
                    </select>
                </div>
                <TextField
                    style={{width: 300}}
                    id="outlined-full-width"
                    label='Product Name'
                    onChange={(e)=>{this.handleUserInput(e)}}
                    value={productName}
                    name='productName'
                    margin="normal"
                    variant="outlined"
                />
                {/* <input type='text' value={productName} onChange={(e)=>{this.handleUserInput(e)}} name='productName' placeholder='Product Name' style={{ height: 40 }} /> */}
                <br />
                {/* <br /> */}
                <TextField
                    style={{width: 300}}
                    id="outlined-full-width"
                    type='number'
                    label='Product Price'
                    onChange={(e)=>{this.handleUserInput(e)}}
                    value={price}
                    name='price'
                    margin="normal"
                    variant="outlined"
                />
                {/* <input type='number' value={price} onChange={(e)=>{this.handleUserInput(e)}} name='price' placeholder='Product Price' style={{ height: 40 }} /> */}
                <br />
                {/* <br /> */}
                <TextField
                    style={{width: 300}}
                    id="outlined-full-width"
                    type='file'
                    // label='Product Image'
                    onChange={(e)=>{this.handleFileInput(e)}}
                    // value={price}
                    name='image'
                    margin="normal"
                    variant="outlined"
                />
                {/* <input type='file' onChange={(e)=>{this.handleFileInput(e)}} name='image' placeholder='Product Image' style={{ height: 40 }} />  */}
                {/* <br /> */}
                <br />
                <button onClick={()=>{this.uploadPost()}} style={{marginBottom: 20 ,cursor: 'pointer', border: '2px dashed black', background: 'none', color: 'black', height: 45, width: 100 }}>
                Add Post
                </button>
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


export default connect(mapStateToProps)(AddPost)