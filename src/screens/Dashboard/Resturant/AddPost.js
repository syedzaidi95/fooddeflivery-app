import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AddCatogery } from '../../../API/firebaseApi'
import firebase from '../../../config/firebae'
import Post from './Post'
class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            catogeryInput: '',
            catogries: null,
            delCatogery: 'null'
        }
    }
    async   addCatogery() {
        if (this.state.catogeryInput !== '') {
            try {
                const result = await AddCatogery(this.state.catogeryInput.toLowerCase(), this.props.user.uid)
                if (result === false) {
                    console.log(result)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    getCatogeries(uid) {
        firebase.database().ref(`catogeries/${uid}`).on('value', (e) => {
            if (e !== null) {
                this.setState({ catogries: e.val() })
            } else {
                this.setState({ catogries: null })
            }
        })
    }
    componentDidMount() {
        this.getCatogeries(this.props.user.uid)
    }
    CatogeriesButton() {
        const { catogries } = this.state
        if (catogries !== null) {
            let options = []
            for (var key in catogries) {
                options.push(<option key={key} value={key}>{catogries[key].toUpperCase()}</option>)
            }
            return (options)
        } else {
            return (
                <option value='null'>No Catogery</option>
            )
        }
    }
    deletCatogery() {
        firebase.database().ref(`catogeries/${this.props.user.uid}`).child(this.state.delCatogery).remove().then((e) => {
            alert('Success Fully Dellet')
        })
    }
    render() {
        const { catogeryInput, delCatogery, catogries } = this.state
        return (
            <div>
                <hr />
                <input type='text' onChange={(e) => { this.setState({ catogeryInput: e.target.value }) }} value={catogeryInput} placeholder='Add New Catogery' />
                <button onClick={() => { this.addCatogery() }}>Add</button>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <select onChange={(e) => { this.setState({ delCatogery: e.target.value }) }}>
                        <option value='null'>Select Catogery to Delet</option>
                        {this.CatogeriesButton()}
                    </select>
                    {delCatogery !== 'null' && <button onClick={() => { this.deletCatogery() }}>Dellet It</button>}
                </div>
                <hr />
                <Post catogries={catogries} uid={this.props.user.uid} />
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