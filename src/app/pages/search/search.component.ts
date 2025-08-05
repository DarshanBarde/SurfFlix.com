import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieApiService } from '../../service/movie-api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    movieName: new FormControl('', [Validators.required])
  });
  searchResult: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private service: MovieApiService) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.searchForm.invalid) {
      this.errorMessage = 'Please enter a movie name';
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.searchResult = [];
    console.log(this.searchForm.value, 'searchform#');
    this.service.getSearchMovie(this.searchForm.value).subscribe({
      next: (result) => {
        console.log(result, 'searchmovie##');
        this.searchResult = result.results || [];
        this.isLoading = false;
        if (this.searchResult.length === 0) {
          this.errorMessage = 'No movies found';
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch search results';
        this.isLoading = false;
        console.error(error);
      }
    });
  }
}