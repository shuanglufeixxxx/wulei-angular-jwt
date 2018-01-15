import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostService } from '../services/post.service';
import { Picture } from '../shared/picture';
import { ConcurrencyService } from '../services/concurrency.service';
import { PictureService } from '../services/picture.service';
import { appearDisappear } from '../animation/appear-disapear';

@Component({
  selector: 'app-post',
  providers: [ PostService, ConcurrencyService, PictureService ],
  animations: [ appearDisappear(true) ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  post: Post;

  pictures: Picture[];

  showPicture: Picture;

  constructor(private postService: PostService
    , private concurrencyService: ConcurrencyService
    , private pictureService: PictureService
    , @Inject('baseURL') private baseURL: string
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(params => {
        let id = params.get("id");
        return this.postService.get(id);
      })
      .switchMap(post => {
        this.post = post;
        return this.concurrencyService.getMany(this.pictureService, this.post.pictures);
      })
      .map(pictures => this.pictures = pictures)
      .subscribe();
  }

  show(picture: Picture) {
    this.showPicture = picture;
  }

  close() {
    this.showPicture = null;
  }
}
