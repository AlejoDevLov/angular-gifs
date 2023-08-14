import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = 'gif-image';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
      if( !this.url ) throw new Error('URL es requerida');
  }

  onLoad(): void {
    setTimeout( () => {
      this.hasLoaded = true;
    }, 300);
  }

}
