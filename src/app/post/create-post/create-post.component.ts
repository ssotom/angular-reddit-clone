import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subreddit } from 'src/app/shared/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';
import { PostRequest } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: PostRequest;
  createPostForm: FormGroup;
  subreddits: Subreddit[];
  errorMessage: string;

  formErrors = {
    'name': '',
    'subredditId': '',
    'description': ''
  };

  validationMessages = {
    'name': {
      'required':      'Title is required.',
      'maxlength':     'Title cannot be more than 40 characters long.'
    },
    'subredditId': {
      'required':      'subreddit is required.'
    },
    'description': {
      'required':      'Description is required.'
    }
  };

  constructor(private formBuilder: FormBuilder, private router: Router,
    private SubredditService: SubredditService, private postService: PostService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.SubredditService.getAllSubreddits().subscribe(
      subreddits => this.subreddits = subreddits
    );
  }

  createForm() {
    this.createPostForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      url: [''],
      subredditId: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', Validators.required]
    });

    this.createPostForm.valueChanges
    .subscribe( () => this.onValueChanged());
  }

  onSubmit() {
    if(this.createPostForm.valid) {
      this.post = this.createPostForm.value;
      this.postService.createPost(this.post).subscribe(
        () => this.router.navigate(['/'])
      , error => this.errorMessage = error);
    } else {
      this.onValueChanged(true);
    }
  }

  discardPost() {}

  onValueChanged(isSend?:boolean) {
    if (!this.createPostForm) { return; }
    const form = this.createPostForm;
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
