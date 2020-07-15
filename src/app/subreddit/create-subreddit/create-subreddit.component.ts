import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subreddit } from 'src/app/shared/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  subrredit: Subreddit;
  createSubredditForm: FormGroup;
  errorMessage: string;

  formErrors = {
    'name': '',
    'description': '',
  };

  validationMessages = {
    'name': {
      'required':      'Title is required.',
      'maxlength':     'Title cannot be more than 40 characters long.'
    },
    'description': {
      'required':      'Description is required.',
    }
  };

  constructor(private formBuilder: FormBuilder, private router: Router,
    private SubredditService : SubredditService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.createSubredditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', Validators.required]
    });

    this.createSubredditForm.valueChanges
    .subscribe( () => this.onValueChanged());
  }

  onSubmit() {
    if(this.createSubredditForm.valid) {
      this.subrredit = this.createSubredditForm.value;
      this.SubredditService.createSubreddit(this.subrredit).subscribe(
        () => this.router.navigate(['/'])
      , error => this.errorMessage = error);
    } else {
      this.onValueChanged(true);
    }
  }
  
  discard() {
    this.router.navigate(['/']);
  }

  onValueChanged(isSend?:boolean) {
    if (!this.createSubredditForm) { return; }
    const form = this.createSubredditForm;
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
