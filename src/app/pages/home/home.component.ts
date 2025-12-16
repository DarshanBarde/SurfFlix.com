import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { MovieApiService } from "../../service/movie-api-service.service"
import { type Subscription, interval } from "rxjs"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  bannerResult: any[] = []
  trendingMovieResult: any[] = []
  popularMovieResult: any[] = []
  topRatedMovieResult: any[] = []
  upcomingMovieResult: any[] = []
  isLoading = false
  errorMessage: string | null = null

  currentHeroIndex = 0
  private heroRotationSubscription?: Subscription
  isTransitioning = false

  constructor(private service: MovieApiService) {}

  ngOnInit(): void {
    this.isLoading = true
    this.loadAllMovies()
    this.bannerData()
  }

  ngOnDestroy(): void {
    if (this.heroRotationSubscription) {
      this.heroRotationSubscription.unsubscribe()
    }
  }

  // Fetch banner data
  bannerData(): void {
    this.service.bannerApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.bannerResult = result.results || []
        this.isLoading = false
        this.startHeroRotation()
      },
      error: (error: any) => {
        this.errorMessage = "Failed to load banner"
        this.isLoading = false
        console.error(error)
      },
    })
  }

  startHeroRotation(): void {
    if (this.bannerResult.length <= 1) return

    this.heroRotationSubscription = interval(5000).subscribe(() => {
      this.nextHero()
    })
  }

  nextHero(): void {
    if (this.isTransitioning || this.bannerResult.length <= 1) return

    this.isTransitioning = true
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.bannerResult.length

    setTimeout(() => {
      this.isTransitioning = false
    }, 800)
  }

  prevHero(): void {
    if (this.isTransitioning || this.bannerResult.length <= 1) return

    this.isTransitioning = true
    this.currentHeroIndex = this.currentHeroIndex === 0 ? this.bannerResult.length - 1 : this.currentHeroIndex - 1

    setTimeout(() => {
      this.isTransitioning = false
    }, 800)
  }

  selectHero(index: number): void {
    if (this.isTransitioning || index === this.currentHeroIndex) return

    this.isTransitioning = true
    this.currentHeroIndex = index

    setTimeout(() => {
      this.isTransitioning = false
    }, 800)
  }

  getCurrentHero(): any {
    return this.bannerResult[this.currentHeroIndex]
  }

  // Load all movie categories
  loadAllMovies(): void {
    this.errorMessage = null

    // Load Trending Movies
    this.service.trendingMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.trendingMovieResult = result.results || []
      },
      error: (error: any) => {
        this.errorMessage = "Failed to load trending movies"
        console.error(error)
      },
    })

    // Load Popular Movies
    this.service.popularMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.popularMovieResult = result.results || []
      },
      error: (error: any) => {
        this.errorMessage = "Failed to load popular movies"
        console.error(error)
      },
    })

    // Load Top Rated Movies
    this.service.topRatedMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.topRatedMovieResult = result.results || []
      },
      error: (error: any) => {
        this.errorMessage = "Failed to load top rated movies"
        console.error(error)
      },
    })

    // Load Upcoming Movies
    this.service.upcomingMovieApiData().subscribe({
      next: (result: { results: any[] }) => {
        this.upcomingMovieResult = result.results || []
        this.isLoading = false
      },
      error: (error: any) => {
        this.errorMessage = "Failed to load upcoming movies"
        this.isLoading = false
        console.error(error)
      },
    })
  }

  scrollRow(container: HTMLElement, direction: "left" | "right"): void {
    const scrollAmount = 600
    const targetScroll =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }
}
