import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {TPixabayImage,IPixabayAPI} from "./pixabayapi"
class PixabayService implements IPixabayAPI {
  private static readonly pixabayAPI = "https://pixabay.com/api/?key=126338-8e2f836ed7b71bbd3fd183c37"
  public async queryImagesFromPixabay(searchText: string, numberofImagesToGet: number): Promise<TPixabayImage[]> {
    if(searchText) {
      const q = PixabayService.pixabayAPI + "&safesearch=true&image_type=photo&per_page=" + numberofImagesToGet + "&q=" + encodeURIComponent(searchText)
      try {
        const r = await fetch(q)
        const v = await r.json()
        return v.hits //see https://pixabay.com/api/docs/
      } catch(reason) {
        console.log("queryImagesFromPixabay:Query:" + q, reason)
        throw new Error(reason)
      }
    } else {return []} 
  }
}
const pixabayService: IPixabayAPI = new PixabayService()
ReactDOM.render(<App pixabayApi={pixabayService}/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
