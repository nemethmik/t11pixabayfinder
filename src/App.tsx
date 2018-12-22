import * as React from 'react'
import logo from './logo.svg'
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from '@material-ui/icons/Search';

import {TPixabayImage,IPixabayAPI} from "./pixabayapi"
type TPixabayFinderProps = {
  pixabayApi: IPixabayAPI,
}
type TPixabayFinderState = {
  images:TPixabayImage[],
  searchText: string,
}
export default class App extends React.Component<TPixabayFinderProps,TPixabayFinderState> implements ISearchBarEvents {
  public state:TPixabayFinderState = {
    images:[],
    searchText: "",
  } 
  async componentDidMount() {
    // const images = await this.props.pixabayApi.queryImagesFromPixabay("dogs",15)
    // this.setState({images})
    await this.onSearchTextChange("dogs")
  }
  //This lambda function implements ISearchBarEvents.onSearchTextChange function, cool!
  public onSearchTextChange = async (searchText:string) => {
    this.setState({searchText: searchText})
    const images = await this.props.pixabayApi.queryImagesFromPixabay(searchText,15)
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
      <SearchBar searchText={this.state.searchText} onSearchTextChange={this.onSearchTextChange} />
      {!this.state.images.length && <div>Loading Images ...</div>}
      {this.state.images.map((i) => {
        return (<div key={i.id}>{i.tags} by {i.user} <img src={i.largeImageURL} width="100%"/></div>)
      })}
      </>
    )
  }
}
//The interface can be even defined after the App implements it, cool!
interface ISearchBarEvents {
  onSearchTextChange(searchText:string):void
}
type TSearchBarProps = {
  searchText: string,
}
class SearchBar extends React.Component<TSearchBarProps & ISearchBarEvents>{
  public render() {
    //console.log("Images:",this.state.images," numberofImagesToGet=" + this.state.numberofImagesToGet)
    return (
      <div>
        <TextField label="Search" value={this.props.searchText} style={{marginTop:8}}
          onChange={(e)=>this.props.onSearchTextChange(e.target.value)}
          InputProps={{
            /*startAdornment:(<InputAdornment position="start"><SearchIcon /></InputAdornment>),*/
            endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
          }} helperText="Start typing search string" fullWidth={true}
        />
      </div>
  )}
}
