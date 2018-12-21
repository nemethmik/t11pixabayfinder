import * as React from 'react'
import logo from './logo.svg'
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import {TPixabayImage,IPixabayAPI} from "./pixabayapi"
export type TPixabayFinderProps = {
  pixabayApi: IPixabayAPI,
}
type TPixabayFinderState = {
  images:TPixabayImage[],
}
export default class App extends React.Component<TPixabayFinderProps,TPixabayFinderState> {
  public state:TPixabayFinderState = {
    images:[]
  } 
  async componentDidMount() {
    const images = await this.props.pixabayApi.queryImagesFromPixabay("dogs",15)
    this.setState({images})
  }
  render() {
    return (
      <>
      <AppBar position="sticky">
        <Toolbar>
          <img src={logo} className="App-logo" alt="logo" width="56px" />
          <Typography variant="h6" noWrap color="inherit">Pixabay Image Finder</Typography>
        </Toolbar>
        <Toolbar>
          <a href="https://pixabay.com/">
            <img src="https://pixabay.com/static/img/public/leaderboard_b.png" width="100%" alt="Pixabay"/>
           </a>
        </Toolbar>
      </AppBar>
      {!this.state.images.length && <div>Loading Images ...</div>}
      {this.state.images.map((i) => {
        return (<div key={i.id}>{i.tags} by {i.user} <img src={i.largeImageURL} width="100%"/></div>)
      })}
      </>
    )
  }
}
