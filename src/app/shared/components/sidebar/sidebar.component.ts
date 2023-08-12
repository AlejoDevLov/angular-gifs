import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService:GifsService ){}

  // public tags:string[] = this.gifsService.tagsHistory; // incorrecto
  get tags():string[] { // correcto
    return this.gifsService.tagsHistory;
  }

  onSearchTag(tag:string):void {
    this.gifsService.searchTag(tag);
  }
}
