import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, Giphy } from "../interfaces/gifs.interface";


@Injectable({
  providedIn: 'root'
})
export class GifsService{

  public gifsList:         Gif[] = [];
  private API_KEY:        string = 's1JFttLbG6o7qYR42ZNnqw8QfJNKX16Y';
  private _tagsHistory: string[] = [];
  private serviceUrl:     string = 'https://api.giphy.com/v1/gifs/search';

  constructor( private http:HttpClient ){
    this.loadLocalStorage();
    this.searchTag(this._tagsHistory[0]);
  }

  private saveOnLocalStorage():void {
    localStorage.setItem('gifs', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('gifs') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('gifs')! );
  }

  organizeHistory( word:string ) {
    const wordDuplicate = this._tagsHistory.find( tag => {
      return tag === word;
    });

    this._tagsHistory = this._tagsHistory.filter( tag => {
      return tag !== wordDuplicate;
    });

    if( this._tagsHistory.length === 10 ) this._tagsHistory.pop();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag( tag:string ):void {
    const tagLowerCase = tag.toLowerCase();
    if( tagLowerCase.length === 0 ) return;
    this.organizeHistory(tagLowerCase);
    this._tagsHistory.unshift(tagLowerCase);
    this.saveOnLocalStorage();

    const params = new HttpParams()
    .set('api_key',this.API_KEY )
    .set('q', tag)
    .set('limit', '10');

    this.http.get<Giphy>( this.serviceUrl, { params })
      .subscribe( resp => {
        this.gifsList = resp.data;
        // console.log(this.gifsList);
      })
  }
}
