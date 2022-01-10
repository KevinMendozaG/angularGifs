import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'DuqexyJxoo86MFblfQpx9cjTd294mfn3';
  private _historial: string[] = [];
  
  public resultados: Gif[] =[];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}


  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes ( query ) ) {
      
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
  
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=DuqexyJxoo86MFblfQpx9cjTd294mfn3&q=${ query } z&limit=10`)
        .subscribe( ( resp ) => {
          console.log(resp.data);
          this.resultados = resp.data;
        })

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=DuqexyJxoo86MFblfQpx9cjTd294mfn3&q=dragon ball z&limit=10')
    // const data = await resp.json();
    // console.log(data)

  }
  
}
