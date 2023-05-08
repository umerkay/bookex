import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

export class Success extends Component {
  //use state to close the modal
  state = {
    open: true
  };
  //close modal
  handleClose = () => {
    this.setState({ open: false });
  };

  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open={this.state.open}
            fullWidth
            maxWidth='sm'
          >
            <AppBar position="static" title="Success" ><h1>Success</h1></AppBar>
            <h1>Thank You For Your Submission</h1>
            <p>You will get an email with further instructions.</p>
            <button onClick={this.handleClose}>❌</button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;