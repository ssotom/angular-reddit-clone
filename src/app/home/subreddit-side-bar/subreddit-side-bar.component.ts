import { Component, OnInit } from '@angular/core';
import { Subreddit } from 'src/app/shared/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Subreddit[] = [];
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      if (subreddits.length > 3) {
        this.subreddits = subreddits.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = subreddits;
      }
    });
  }

}
