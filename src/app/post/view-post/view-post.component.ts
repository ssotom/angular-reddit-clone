import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: Post;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

}
