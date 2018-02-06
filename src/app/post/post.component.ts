import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostService } from '../services/post.service';
import { Picture } from '../shared/picture';
import { ConcurrencyService } from '../services/concurrency.service';
import { PictureService } from '../services/picture.service';
import { appearDisappear } from '../animation/appear-disapear';
import { LikePostService } from '../services/like-post.service';

@Component({
  selector: 'app-post',
  animations: [ appearDisappear(true) ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  post: Post;

  pictures: Picture[];

  likedPost: boolean = false;

  showPicture: Picture;

  constructor(private postService: PostService
    , private pictureService: PictureService
    , private likePostService: LikePostService
    , @Inject('baseURL') private baseURL: string
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(params => {
        let id = params.get("id");
        // this.likePostService.likePostd(id).subscribe( likePostd => this.likePostdPost = likePostd, error => {} );
        return this.postService.get(id);
      })
      .switchMap(post => {
        this.post = post;
        return this.pictureService.getList( this.post.pictureCollectionId );
      })
      .map(pictures => this.pictures = pictures)
      .subscribe();
  }

  likePost() {
    // this.likePostService.likePost(this.post.id).subscribe( _ => this.likedPost = true );
  }

  dislikePost() {
    // this.likePostService.dislikePost(this.post.id).subscribe( _ => this.likedPost = false );
  }

  show(picture: Picture) {
    this.showPicture = picture;
  }

  close() {
    this.showPicture = null;
  }
}
