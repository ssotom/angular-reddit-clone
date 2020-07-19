import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/shared/comment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: Post;
  commentForm: FormGroup;
  comment: Comment;
  comments: Comment[];

  formErrors = {
    'text': ''
  };

  validationMessages = {
    'text': {
      'required':      'Text is required.',
      'maxlength':     'Text cannot be more than 250 characters long.'
    }
  };

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private commentService: CommentService, private authService: AuthService) {
      this.createForm();
    }

  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
    this.getCommentsForPost();
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsByPost(this.postId)
    .subscribe(comments => {
      this.comments = comments;
    });
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(250)]],
    });

    this.commentForm.valueChanges
    .subscribe( () => this.onValueChanged());
  }

  onSubmit() {
    if(this.commentForm.valid) {
      this.comment = this.commentForm.value;
      this.comment.postId = this.postId;
      this.comment.username = this.authService.getUserName();
      this.commentService.postComment(this.comment)
      .subscribe(
        () => {
          this.commentForm.reset();
          this.getCommentsForPost();
        }
      );
    } else {
      this.onValueChanged(true);
    }
  }

  onValueChanged(isSend?:boolean) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || isSend) && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
