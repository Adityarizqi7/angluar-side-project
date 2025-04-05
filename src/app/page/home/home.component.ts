import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserBioService } from '../../service/users/user-bio.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit {

  device: any[] = [];
  total_user: number = 0

  constructor(
    private userBioService: UserBioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userBioService.getUserBio().subscribe((data) => {
        this.device = data;
    })
  }

  navigateToDeviceDetail(deviceId: string | undefined) {
    if (deviceId) {
      this.router.navigate(['/device', deviceId])
    } else {
      console.error('Error');
    }
  }
}
