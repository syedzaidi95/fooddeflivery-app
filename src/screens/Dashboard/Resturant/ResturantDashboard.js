import React from 'react';
import { connect } from 'react-redux'
import { removeUser } from '../../../Redux/actions/authAction'
import ResturantHeader from '../../../components/ResturantHeader'
import './resturantMain.css'
import AddPost from './AddPost'
import Footer from '../../../components/Footer'

function ResturantDashboard(props) {
    return (
        <div className='resturantMain'>
            <div>
                <ResturantHeader props={props} />
            </div>
            <div className='bgImage'>
            <br />
            <h3>Easy Way to add your product post</h3>
            <br />
                <p>1 Add new Catogery then Select it from catogery selector or Direct Select catogery from selector</p>
                <br />
                <p>2 fill all fields then upload Image then click Add Post</p>
            </div>
            {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop: 60}}>
                
            </div> */}
            <div style={{backgroundColor: 'white'}}>
            <AddPost />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}






const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: () => dispatch(removeUser())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResturantDashboard)
