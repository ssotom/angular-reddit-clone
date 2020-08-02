import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/post';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Vote } from 'src/app/shared/vote';
import { VoteType } from 'src/app/shared/vote-type';
import { VoteService } from 'src/app/services/vote.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: Post;
  vote: Vote;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  errorMessage: string;

  constructor(private voteService: VoteService, private postService: PostService) {
    this.vote = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
    
  }

  upvotePost() {
    this.vote.voteType = VoteType.UPVOTE;
    this.sendVote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.vote.voteType = VoteType.DOWNVOTE;
    this.sendVote();
    this.upvoteColor = '';
  }

  private sendVote() {
    this.vote.postId = this.post.id;
    this.voteService.vote(this.vote).subscribe(() => {
      this.updateVoteDetails();
    }, error => this.errorMessage = error);
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

}
