import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private baseurl = 'https://api.themoviedb.org/3';
  private apikey = 'ce9ccd90272550a5d198fed5905039a3';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Banner API Data (Trending All)
  bannerApiData(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }

  // Trending Movies
  trendingMovieApiData(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }

  // Popular Movies
  popularMovieApiData(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/movie/popular?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }

  // Top Rated Movies
  topRatedMovieApiData(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/movie/top_rated?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }

  // Upcoming Movies
  upcomingMovieApiData(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/movie/upcoming?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }

  // Search Movie
  getSearchMovie(data: any): Observable<any> {
    return this.http
      .get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`)
      .pipe(catchError(this.handleError));
  }
  // New methods for movie details
  getMovieDetails(id: string): Observable<any> {
    return this.http
      .get(`${this.baseurl}/movie/${id}?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http
      .get(`${this.baseurl}/movie/${id}/credits?api_key=${this.apikey}`)
      .pipe(catchError(this.handleError));
  }
}