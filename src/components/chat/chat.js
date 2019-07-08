import React, {Component} from 'react';
import chatbtn from '../../Images/singlechatbtn.png'
import {connect} from 'react-redux';

class Chat extends Component{
    constructor(){
        super();
        this.state = {
            chat: false,
            chatInput: ''
        }
    }
    componentWillMount(){
        // this.props.func()
    }
    sendMessege(){

    }
    render(){
        const {chat, chatInput} = this.state
        return(
            <div>
                <img src={chatbtn} onClick={()=>{this.setState({chat: !chat})}} alt='chat'style={{cursor: 'pointer',width: 100, height: 100, position: 'fixed', bottom: 10, right: 10, zIndex: 10}} />
           {chat && <div style={{overflow: 'hidden',backgroundColor: 'white', boxShadow: '0px 0px 5px green', height: 400, width: 350, position: 'fixed', bottom: 55, right: 75, zIndex: 20, borderRadius: 20}}>
            <div>
               <header style={{backgroundColor: 'blue', height: 25}}>Name of Resturant</header>
               <main style={{height: 300, overflow: 'auto'}}>
                   <p>
                       Text
                   </p>
               </main>
               <hr />
               <footer style={{height: 30}}>
                   <input type='text' value={chatInput} onChange={(e)=>{this.setState({chatInput: e.target.value})}} /> <button onClick={()=>{this.sendMessege()}}>Send</button>
               </footer>
           </div>
           </div>}
           
           
           
           
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}
export default connect(mapStateToProps)(Chat)
