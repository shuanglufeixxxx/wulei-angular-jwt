import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostService } from '../services/post.service';
import { Picture } from '../shared/picture';
import { ConcurrencyService } from '../services/concurrency.service';
import { PictureService } from '../services/picture.service';
import { appearDisappear } from '../animation/appear-disapear';
import { PostLikeService } from '../services/post-like.service';

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
    , private postLikeService: PostLikeService
    , @Inject('baseURL') private baseURL: string
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(params => {
        let id = params.get("id");
        // this.postLikeService.postLiked(id).subscribe( postLiked => this.postLikedPost = postLiked, error => {} );
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
    // this.postLikeService.likePost(this.post.id).subscribe( _ => this.likedPost = true );
  }

  dislikePost() {
    // this.postLikeService.dislikePost(this.post.id).subscribe( _ => this.likedPost = false );
  }

  show(picture: Picture) {
    this.showPicture = picture;
  }

  close() {
    this.showPicture = null;
  }
}
