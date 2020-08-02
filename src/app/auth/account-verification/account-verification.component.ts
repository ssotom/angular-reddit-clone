import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

  token: string;
  message: string;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;
    this.authService.accountVerification(this.token).subscribe(
      response => {
        this.message = response.message;
      },
      error => {
        this.message = null;
        this.errorMessage = error;
      });
  }

}
