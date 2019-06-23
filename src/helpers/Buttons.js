import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

class NormalBtn extends Component {
    render() {
        return (
            <Fab disabled={this.props.disabled} onClick={this.props.func} color={this.props.color} style={this.props.style} variant="extended" >
                {this.props.text}
            </Fab>
        )
    }
}

export {
    NormalBtn,
}