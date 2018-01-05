import { Component, OnInit, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { Picture } from '../shared/picture';
import { PostPreview } from '../shared/PostPreview';
import { PictureService } from '../services/picture.service';
import { ConcurrencyService } from '../services/concurrency.service';

@Component({
  selector: 'app-post-preview',
  providers: [ PictureService, ConcurrencyService ],
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit, OnChanges {

  @Input() preview: PostPreview;
  
  pictures: Picture[];

  onePictureWidth: string;
  onePictureHeight: string;

  constructor(private pictureService: PictureService
    , private concurrencyService: ConcurrencyService
    , @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.prepareContent();
  }

  ngOnChanges( _: SimpleChanges) {
    this.prepareContent();
  }

  prepareContent() {
    this.concurrencyService.getMany(this.pictureService, this.preview.pictures)
      .subscribe(pictures => this.pictures = pictures);
    
    switch(this.preview.style) {
      case 'one':
      this.onePictureWidth = "100";
      this.onePictureHeight = "100";
      break;
      case 'two':
      this.onePictureWidth = "50";
      this.onePictureHeight = "100";
      break;
      case 'three':
      this.onePictureWidth = "33.33";
      this.onePictureHeight = "100";
      break;
      case 'four':
      this.onePictureWidth = "50";
      this.onePictureHeight = "50";
      break;
      case 'nine':
      this.onePictureWidth = "33.33";
      this.onePictureHeight = "33.33";
      break;
    }
  }

}