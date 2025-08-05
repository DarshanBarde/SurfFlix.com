import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from '../../service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};
  credits: { cast: any[]; crew: any[] } = { cast: [], crew: [] };
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private service: MovieApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.fetchMovieDetails(id);
      this.fetchMovieCredits(id);
    } else {
      this.errorMessage = 'No movie ID provided';
      this.isLoading = false;
    }
  }

  fetchMovieDetails(id: string): void {
    this.service.getMovieDetails(id).subscribe({
      next: (result) => {
        this.movie = result;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load movie details';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  fetchMovieCredits(id: string): void {
    this.service.getMovieCredits(id).subscribe({
      next: (result) => {
        this.credits = {
          cast: result.cast.slice(0, 5), // Limit to top 5 cast members
          crew: result.crew.filter((member: any) => member.job === 'Director') // Get director
        };
      },
      error: (error) => {
        this.errorMessage = 'Failed to load movie credits';
        console.error(error);
      }
    });
  }

  // Format runtime from minutes to hours and minutes
  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}