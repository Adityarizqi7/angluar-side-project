import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserBioService } from '../../service/users/user-bio.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DetailService } from '../../service/users/detail.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit {

  device: any[] = [];
  total_user: number = 0

  chooseDevice: boolean = true;
  chooseToDo: boolean = false;

  todos: {task: string, done: boolean}[] = []
  newTask = '';

  constructor(
    private userBioService: UserBioService,
    private route: ActivatedRoute,
    private router: Router,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.detailService.clearDeviceDetail()
    this.userBioService.getUserBio().subscribe((data) => {
        this.device = data;
    })
  }

  navigateToDeviceDetail(device: any) {
    this.detailService.setDeviceDetail(device)
    this.router.navigate(['/device-detail'], { queryParams: { ref: device.id } });
  }

  handleChooseDevice() {
    this.chooseDevice = !this.chooseDevice;
    this.chooseToDo = false;
  }

  handleChooseToDo() {
    this.chooseDevice = false;
    this.chooseToDo = !this.chooseToDo
  }

  handleBackToMenu() {
    this.chooseDevice = false;
    this.chooseToDo = false;
  }

  addNewTask() {
      if(this.newTask.trim()) {
          this.todos.push({ task: this.newTask, done: false });
          this.newTask = ''
      } else {
        alert('Isi task terlebih daulu.');
      }
  }

  handleDone(index: any) {
    this.todos[index].done = true
  }

  handleDeleteTask(index: any) {
    this.todos.splice(index, 1)
  }
}
