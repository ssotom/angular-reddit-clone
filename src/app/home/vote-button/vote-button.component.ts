import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/post';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: Post;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;

  constructor() { }

  ngOnInit(): void {
  }

  upvotePost() {}

  downvotePost() {}

}
