import React from 'react';
import { connect } from 'react-redux'
import ResturantHeader from './ResturantHeader'
import { removeUser } from '../../../Redux/actions/authAction'
// import { NormalBtn } from '../../../helpers/Buttons';
import MainTabs from './mainTabs'


function ResturantDashboard(props) {
    return (
        <div>
            <ResturantHeader props={props} />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop: 60}}>
                <MainTabs />
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
