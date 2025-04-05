import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserBioService } from '../../../service/users/user-bio.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})


export class DetailComponent implements OnInit {
  
  showForm: boolean = false;
  detail_device: any = {}
  loadingDelete: boolean = false;
  isLoadingEdit: boolean = false;

  newObject = {
      name: '',
      data: {
        capacity: '',
        color: ''
      }
  }

  constructor(
    private userDetailService: UserBioService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private titleService: Title
  ) {};

  ngOnInit(): void {
    this.titleService.setTitle('Edit Device Project - Aditya Rizqi Ardhana')
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userDetailService.getUserDetail(id).subscribe(data => {
          this.detail_device = data;
          console.log(data.data.capacity);
          this.newObject = {
            name: data.name,
            data: {
              capacity: data.data.capacity,
              color: data.data.color
            }
        }
          console.log(data);
        })
      }
    })
  }

  handleDelete() {
    const id = this.detail_device.id;

    this.loadingDelete = true;
    this.userDetailService.deleteService(id).subscribe({
      next: () => {
        alert('Device berhasil dihapus');
        this.router.navigate(['/']);
        this.loadingDelete = false;
      },
      error: (err) => {
        console.error('Gagal menghapus device:', err);
        alert('Gagal menghapus device.');
        this.loadingDelete = false;
      }
    })
  }

  submitForm() {
    this.isLoadingEdit = true;
    this.http.put(`https://api.restful-api.dev/objects/${this.detail_device.id}`, this.newObject).subscribe(
      (response) => {
        alert('Device berhasil diubah');
        console.log(this.newObject);
        console.log(response)
        this.isLoadingEdit = false;
      },
      (error) => {
        this.isLoadingEdit = false;
        console.log(error);
        alert('Gagal mengubah device.');
      }
    )
  }

  handleShowForm() {
    this.showForm = !this.showForm;
  }
}
