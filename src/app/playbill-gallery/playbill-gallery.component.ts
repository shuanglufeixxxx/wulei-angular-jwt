import { Component, OnInit, Input, Inject } from '@angular/core';
import { Post } from '../shared/Post';
import { ConcurrencyService } from '../services/concurrency.service';
import { PictureService } from '../services/picture.service';
import { Picture } from '../shared/picture';

@Component({
  selector: 'app-playbill-gallery',
  providers: [ ConcurrencyService, PictureService ],
  templateUrl: './playbill-gallery.component.html',
  styleUrls: ['./playbill-gallery.component.scss']
})
export class PlaybillGalleryComponent implements OnInit {

  @Input() posts: Post[];

  playbills: Picture[];
  
  constructor(private concurrencyService: ConcurrencyService
    , private pictureService: PictureService
    , @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    var ids: string[] = [];
    for(let post of this.posts) {
      ids.push(post.playbill);
    }
    
    this.concurrencyService.getMany(this.pictureService, ids)
      .subscribe(playbills => this.playbills = playbills );
  }

  swipeLeft() {
  }

  swipeRight() {
  }

  navigateTo(index: number) {
  }
}
