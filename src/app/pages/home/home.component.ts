import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../service/movie-api-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bannerResult: any[] = [];
  trendingMovieResult: any[] = [];
  popularMovieResult: any[] = [];
  topRatedMovieResult: any[] = [];
  upcomingMovieResult: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private service: MovieApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadAllMovies();
    this.bannerData();
  }

  // Fetch banner data
  bannerData(): void {
    this.service.bannerApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.bannerResult = result.results || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load banner';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  // Load all movie categories
  loadAllMovies(): void {
    this.errorMessage = null;

    // Load Trending Movies
    this.service.trendingMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.trendingMovieResult = result.results || [];
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load trending movies';
        console.error(error);
      }
    });

    // Load Popular Movies
    this.service.popularMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.popularMovieResult = result.results || [];
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load popular movies';
        console.error(error);
      }
    });

    // Load Top Rated Movies
    this.service.topRatedMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.topRatedMovieResult = result.results || [];
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load top rated movies';
        console.error(error);
      }
    });

    // Load Upcoming Movies
    this.service.upcomingMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.upcomingMovieResult = result.results || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load upcoming movies';
        this.isLoading = false;
        console.error(error);
      }
    });
  }
}