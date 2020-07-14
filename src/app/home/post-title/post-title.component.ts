import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/post';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {

  @Input() data: Post[];
  faComments = faComments;

  constructor() { }

  ngOnInit(): void {
  }

}
