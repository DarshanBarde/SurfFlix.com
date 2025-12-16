import { Component, HostListener, type OnInit } from "@angular/core"
import { MovieApiService } from "./service/movie-api-service.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "SurfFlix.com"
  navbg: any
  quickLaunchMovies: any[] = []

  constructor(private movieService: MovieApiService) {}

  ngOnInit(): void {
    this.movieService.popularMovieApiData().subscribe({
      next: (result) => {
        this.quickLaunchMovies = (result.results || []).slice(0, 5)
      },
      error: (error) => {
        console.error("Failed to load quick launch movies", error)
      },
    })
  }

  @HostListener("document:scroll") scrollover() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      this.navbg = {
        "background-color": "rgba(18, 20, 25, 0.95)",
        "backdrop-filter": "blur(10px)",
      }
    } else {
      this.navbg = {}
    }
  }
}
