import { Component, OnInit, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Picture } from '../shared/picture';
import { PictureService } from '../services/picture.service';
import { ConcurrencyService } from '../services/concurrency.service';
import { Post } from '../shared/Post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-post-preview',
  providers: [ PictureService, ConcurrencyService ],
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit, OnChanges {

  @Input() post: Post;
  
  pictures: Picture[][];

  onePictureWidth: string;
  onePictureHeight: string;

  animationClass = { 'animationDisappear': false, 'animationAppear': false };

  constructor(private pictureService: PictureService
    , private concurrencyService: ConcurrencyService
    , @Inject('baseURL') private baseURL: string
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPreviewPictures().subscribe(pictures => {
      this.prepareContent(pictures);
    });
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if(simpleChange.post.previousValue === undefined) return;
    
    this.animationClass = { 'animationDisappear': true, 'animationAppear': false };
    
    this.getPreviewPictures()
      .delay(100)
      .map(pictures => {
        this.prepareContent(pictures);
        this.animationClass = { 'animationDisappear': false, 'animationAppear': true };
      })
      .subscribe();
  }

  getPreviewPictures(): Observable<Picture[]> {
    return this.pictureService.getList( this.post.previewPictureCollectionId );
  }

  prepareContent(pictures: Picture[]) {
    var columns: number = +this.post.previewStyle.substr(0, 1);
    var rows: number = +this.post.previewStyle.substr(2, 1);

    this.onePictureWidth = (100.0 / columns).toString();
    this.onePictureHeight = (100.0 / rows).toString();

    console.log(this.onePictureWidth);
    console.log(this.onePictureHeight);

    var index = 0;
    var picturesTemp: Picture[][] = [];
    for(var i = 0; i < rows; i++) {
      var rowContent = [];
      for(var j = 0; j < columns; j++) {
        rowContent.push(pictures[index]);
        index += 1;
      }
      picturesTemp.push(rowContent);
    }
    this.pictures = picturesTemp;
    console.log(this.pictures);
  }
}
