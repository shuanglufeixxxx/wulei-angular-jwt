import { Component, OnInit, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { Picture } from '../shared/picture';
import { PictureService } from '../services/picture.service';
import { Post } from '../shared/Post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit, OnChanges {

  @Input() post: Post;
  
  pictures: string[][];

  onePictureWidth: string;
  onePictureHeight: string;

  animationClass = { 'animationDisappear': false, 'animationAppear': false };

  constructor(private pictureService: PictureService
    , @Inject('imageURL') private imageURL: string) { }

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
    if(pictures.length === 0) {
      this.pictures = null;
      return;
    }

    var columns: number = +this.post.previewStyle.substr(0, 1);
    var rows: number = +this.post.previewStyle.substr(2, 1);

    this.onePictureWidth = (100.0 / columns).toString();
    this.onePictureHeight = (100.0 / rows).toString();

    var index = 0;
    var picturesTemp: string[][] = [];
    for(var i = 0; i < rows; i++) {
      var rowContent = [];
      for(var j = 0; j < columns; j++) {
        rowContent.push(pictures[index].id);
        index += 1;
      }
      picturesTemp.push(rowContent);
    }
    this.pictures = picturesTemp;
  }
}
