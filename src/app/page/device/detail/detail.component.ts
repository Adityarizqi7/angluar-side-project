import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserBioService } from '../../../service/users/user-bio.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { DetailService } from '../../../service/users/detail.service';

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
        color: '',
        price: '',
        screen_size: ''
      }
  }

  constructor(
    private userDetailService: UserBioService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private titleService: Title,
    private detailService: DetailService
  ) {};

  ngOnInit(): void {
    this.titleService.setTitle('Edit Device Project - Aditya Rizqi Ardhana')

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('ref');
      if (id) {
        this.userDetailService.getUserDetail(id).subscribe(data => {
          this.detail_device = data;
          console.log(data)
          this.newObject = {
            name: data.name,
            data: {
              capacity: data?.data['capacity GB'] || data?.data?.capacity || data?.data?.['Capacity'],
              color: data?.data?.color,
              price: data?.data?.price,
              screen_size: data?.data?.['Screen size']
            }
          }
        })
      } else {
        this.router.navigate(['/'])
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
