// import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// import { List, ListItem, ListItemText } from '@material-ui/core/';
// import Button from '@material-ui/core/Button';

// export class Confirm extends Component {
//   continue = e => {
//     e.preventDefault();
//     // PROCESS FORM //
//     this.props.nextStep();
//   };

//   back = e => {
//     e.preventDefault();
//     this.props.prevStep();
//   };

<<<<<<< HEAD
//   render() {
//     const {
//       values: { firstName, lastName, email, occupation, city, bio }
//     } = this.props;
//     return (
//       <MuiThemeProvider>
//         <>
//           <Dialog
//             open
//             fullWidth
//             maxWidth='sm'
//           >
//             <AppBar title="Confirm User Data" />
//             <List>
//               <ListItem>
//                 <ListItemText primary="First Name" secondary={firstName} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Last Name" secondary={lastName} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Email" secondary={email} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Occupation" secondary={occupation} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="City" secondary={city} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Bio" secondary={bio} />
//               </ListItem>
//             </List>
//             <br />
=======
  render() {
    const {
      values: { firstName, lastName, email, occupation, city, bio }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open={true}
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirm User Data" />
            <List>
              <ListItem>
                <ListItemText primary="First Name" secondary={firstName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={lastName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Occupation" secondary={occupation} />
              </ListItem>
              <ListItem>
                <ListItemText primary="City" secondary={city} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Bio" secondary={bio} />
              </ListItem>
            </List>
            <br />
>>>>>>> d0f67a2f32eb4d9f13feffffbafa04dcce138a40

//             <Button
//               color="secondary"
//               variant="contained"
//               onClick={this.back}
//             >Back</Button>

//             <Button
//               color="primary"
//               variant="contained"
//               onClick={this.continue}
//             >Confirm & Continue</Button>
//           </Dialog>
//         </>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default Confirm;