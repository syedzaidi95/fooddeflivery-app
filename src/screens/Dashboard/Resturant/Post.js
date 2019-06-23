import React , {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {NormalBtn} from '../../../helpers/Buttons';
import firebase from '../../../config/firebae'

class Post extends Component{
    constructor(){
        super();
        this.state = {
            catogries: null,
            catogeryKey: '',
            uid: '',
            productName: '',
            price: '',
            file: '',
        }
        this.uploadPost = this.uploadPost.bind(this)
    }
    uploadPost(){
        const {catogeryKey, uid, productName, price, file} = this.state
        let date = new Date()
        let timeStamp = date.getTime()
        if(catogeryKey !== 'null' && productName !== '' && price !== '' && file !== ''){
            let postObj = {
                productName,
                price,
            }
            firebase.storage().ref(`${uid}/${catogeryKey}`).child(`${timeStamp}`).put(file).then((e)=>{
                e.ref.getDownloadURL().then((url)=>{
                    postObj.imageUrl = url
                    postObj.imageName = e.metadata.name
                    firebase.database().ref(`posts/${uid}/${catogeryKey}`).push(postObj).then((e)=>{
                        console.log(e)
                    })
                })
            })
        }
    }
static getDerivedStateFromProps(nextProps){
    return{catogries: nextProps.catogries, uid: nextProps.uid}
}

catogeryOptions(){
    const {catogries} = this.state
    let option = []
    for(var key in catogries){
        option.push(<option value={key} key={key} >{catogries[key]}</option>)
    }
    return(option)
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
render(){
    const {productName, price, catogries } = this.state
    const normalStyle = { width: '300px', height: '50px' }
        return(
            <div>
                {catogries === null ? <h1>Pleast Add Catogery First</h1> :
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <h2>Add Post</h2>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <select style={normalStyle} onChange={(e)=>{this.setState({catogeryKey: e.target.value})}}>
                <option value='null'>Select Catogery</option>
                {this.catogeryOptions()}
            </select>
            <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={productName}
                    style={normalStyle}
                    label="Product Name"
                    type="text"
                    margin="normal"
                    name='productName'
                />
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={price}
                    style={normalStyle}
                    label="Product Price"
                    type="number"
                    margin="normal"
                    name='price'
                />
                <TextField
                    onChange={(event) => this.handleFileInput(event)}
                    // value={productName}
                    style={normalStyle}
                    label="Image"
                    accept="image/png, image/jpg, image/jpeg"
                    type="file"
                    margin="normal"
                    name='file'
                />
            <NormalBtn func={this.uploadPost} text='Add' style={{width: '100px'}} />
            </div>
            </div>
            }
                
            </div>
        )
    }
}


export default Post