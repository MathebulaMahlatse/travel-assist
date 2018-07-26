import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './box.css'

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
    },
    box: {
        width:'100px',
        height:'100px',
        backgroundColor:'red'
    }
  });

class Box extends React.Component {
    render() {
        const {props} = this;
        return (
            <div className='box'>
                <div className='row'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Box);