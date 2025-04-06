import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent implements OnInit {
    newObject = {
        name: '',
        data: {
          price: '',
          year: ''
        }
    };
    isLoadingSubmit: boolean = false;

    constructor(
      private http: HttpClient,
      private titleService: Title,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Create Device Project - Aditya Rizqi Ardhana')
    }

    submitForm() {
      this.isLoadingSubmit = true;
        this.http.post('https://api.restful-api.dev/objects', this.newObject).subscribe(
          (response) => {
            alert('Device berhasil ditambahkan!')
            this.isLoadingSubmit = false;
          },
          (error) => {
            console.error(error, 'Error')
            this.isLoadingSubmit = false;
          }
        );
    }

    handleBackToHomePage() {
      this.router.navigate(['/'])
    }
}
