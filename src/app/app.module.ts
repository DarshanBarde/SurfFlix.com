import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HttpClientModule } from '@angular/common/http'
import { MovieApiService } from './service/movie-api-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PluckPipe } from './pipes/pluck.pipe';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    PluckPipe,
    JoinPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [MovieApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
