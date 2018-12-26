import * as React from 'react'
import logo from './logo.svg'
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Input from "@material-ui/core/Input"
import FormHelperText from "@material-ui/core/FormHelperText"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import Slide from "@material-ui/core/Slide"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from '@material-ui/icons/Search'
import ZoomInIcon from '@material-ui/icons/ZoomIn'

import {TPixabayImage,IPixabayAPI} from "./pixabayapi"
type TPixabayFinderProps = {
  pixabayApi: IPixabayAPI,
}
type TPixabayFinderState = {
  images:TPixabayImage[],
  searchText: string,
  numberOfImagesToGet: number,
  openImageDialog:boolean,
  imageDetails:TPixabayImage,
}
export default class App extends React.Component<TPixabayFinderProps,TPixabayFinderState> implements ISearchBarEvents, IImageListEvents, IImageDetailsDialogEvents {
  public state:TPixabayFinderState = {
    images:[],
    searchText: "",
    numberOfImagesToGet: 15,
    openImageDialog:false,
    imageDetails:{id:0,largeImageURL:"",tags:"",user:""}
  } 
  async componentDidMount() {
    // const images = await this.props.pixabayApi.queryImagesFromPixabay("dogs",15)
    // this.setState({images})
    await this.onSearchTextChange("dogs")
  }
  //This lambda function implements ISearchBarEvents.onSearchTextChange function, cool!
  public onSearchTextChange = async (searchText:string) => {
    this.setState({searchText})
    const images = await this.props.pixabayApi.queryImagesFromPixabay(searchText,this.state.numberOfImagesToGet)
    this.setState({images})
  }
  //Here we maybe decide to store the selected number of images, but not to query.
  public onNumberOfImagesSelected = async (numberOfImages:number) => {
    this.setState({numberOfImagesToGet: numberOfImages})
    const images = await this.props.pixabayApi.queryImagesFromPixabay(this.state.searchText,numberOfImages)
    this.setState({images})
  }
  public onOpenImageDetails = (imageDetails:TPixabayImage) => {
    console.log("Opening Image Details Dialog:" + imageDetails.tags)
    this.setState({imageDetails,openImageDialog:true})
  }
  public onCloseImageDetails = () => {
    this.setState({openImageDialog:false})
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
      <SearchBarSFC searchText={this.state.searchText} onSearchTextChange={this.onSearchTextChange} 
        onNumberOfImagesSelected={this.onNumberOfImagesSelected}
        numberofImagesToGet={this.state.numberOfImagesToGet} />
      {!this.state.images.length && <div>Loading Images ...</div>}
      {/*this.state.images.map((i) => {
        return (<div key={i.id}>{i.tags} by {i.user} <img src={i.largeImageURL} width="100%"/></div>)
      })*/}
      {this.state.images.length && <ImageListSFC images={this.state.images} 
        onOpenImageDetails={this.onOpenImageDetails}/>}
      <ImageDetailsDialog imageDetails={this.state.imageDetails} 
        openImageDialog={this.state.openImageDialog} onCloseImageDetails={this.onCloseImageDetails}/>
      </>
    )
  }
}
//The interface can be even defined after the App implements it, cool!
interface ISearchBarEvents {
  onSearchTextChange(searchText:string):void
  onNumberOfImagesSelected(numberOfImages:number):void
}
type TSearchBarProps = {
  searchText: string,
  numberofImagesToGet: number,
}
const SearchBarSFC: React.SFC<TSearchBarProps & ISearchBarEvents> = (props):React.ReactElement<any> => (
  <div>
    <TextField label="Search" value={props.searchText} style={{marginTop:8}}
      onChange={(e)=>props.onSearchTextChange(e.target.value)}
      InputProps={{
        /*startAdornment:(<InputAdornment position="start"><SearchIcon /></InputAdornment>),*/
        endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
      }} helperText="Start typing search string" fullWidth={true}
    />
    <FormControl fullWidth={true} style={{marginTop:8,backgroundColor:"lightGreen"}}>
      <InputLabel htmlFor="numberofImagesToGet">Number of Images to Fetch: </InputLabel>
      <Select value={props.numberofImagesToGet} autoWidth
        onChange={(e)=>{
          const n = parseInt(e.target.value,10) 
          props.onNumberOfImagesSelected(n)
        }} 
        input={<Input id="numberofImagesToGet" />}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
      <FormHelperText>Select the number of images to fetch from Pixabay</FormHelperText>
    </FormControl>
  </div>
)

type TImageListProps = {
  images:TPixabayImage[]
}
interface IImageListEvents {
  onOpenImageDetails(imageDetails:TPixabayImage):void
}
const ImageListSFC: React.SFC<TImageListProps & IImageListEvents> = (props):React.ReactElement<any> => (
  <GridList cols={3}>
    {props.images.map(i => (
      <GridListTile key={i.id}>
        <img src={i.largeImageURL} alt={i.tags} />
          <GridListTileBar title={i.tags} subtitle={<span>by: {i.user}</span>}
          actionIcon={
            <IconButton onClick={()=>props.onOpenImageDetails(i)}>
              <ZoomInIcon color="secondary" />
            </IconButton>}/>
      </GridListTile>
    ))}
  </GridList>
)

interface IImageDetailsDialogEvents {
  onCloseImageDetails():void
}
type TImageDetailsDialogProps = {
  openImageDialog:boolean,
  imageDetails:TPixabayImage,
}
class ImageDetailsDialog extends React.PureComponent<TImageDetailsDialogProps & IImageDetailsDialogEvents> {
  private transition(props:any) {
    return <Slide direction="up" {...props} />;
  }
  public render() {
    return (
      <Dialog open={this.props.openImageDialog} TransitionComponent={this.transition}
      keepMounted onClose={this.props.onCloseImageDetails} fullScreen
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Pixabay Image Details
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogTitle id="alert-dialog-slide-title">
      {this.props.imageDetails.tags} by {this.props.imageDetails.user}
      </DialogTitle>
      <DialogContent>
        <img src={this.props.imageDetails.largeImageURL} width="100%"/>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.onCloseImageDetails} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
    )
  }
}
