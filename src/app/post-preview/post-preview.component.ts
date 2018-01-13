import { Component, OnInit, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Picture } from '../shared/picture';
import { PictureService } from '../services/picture.service';
import { ConcurrencyService } from '../services/concurrency.service';
import { Post } from '../shared/Post';

@Component({
  selector: 'app-post-preview',
  providers: [ PictureService, ConcurrencyService ],
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit, OnChanges {

  @Input() post: Post;
  
  pictures: Picture[];

  onePictureWidth: string;
  onePictureHeight: string;

  constructor(private pictureService: PictureService
    , private concurrencyService: ConcurrencyService
    , @Inject('baseURL') private baseURL: string
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.prepareContent();
  }

  ngOnChanges( _: SimpleChanges) {
    this.prepareContent();
  }

  prepareContent() {
    this.concurrencyService.getMany(this.pictureService, this.post.previewPictures)
      .subscribe(pictures => this.pictures = pictures);
    
    switch(this.post.previewStyle) {
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

  navigateToPost() {
    this.router.navigate(['post', this.post.id]);
  }
}
