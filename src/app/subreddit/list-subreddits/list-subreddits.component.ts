import { Component, OnInit } from '@angular/core';
import { Subreddit } from 'src/app/shared/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Subreddit[];
  constructor(private subredditService: SubredditService) { }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      this.subreddits = subreddits;
    });
  }

}
