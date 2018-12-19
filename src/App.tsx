import * as React from 'react'
import logo from './logo.svg'
//import './App.css';
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
import Button from "@material-ui/core/Button"
//For the button test checkout: public\materialuibuttonwithreactlogo.png
export default class App extends React.Component {
  render() {
    return (
      <Button variant="contained" color="secondary">Pixabay Image Finder
        <img src={logo} className="App-logo" alt="logo" width="30px" />
      </Button>
    )
  }
}
