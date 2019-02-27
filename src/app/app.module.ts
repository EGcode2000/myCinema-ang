//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
//sercvices
import { MoviesService } from './services/movies.service';
import { TheaterService } from './services/theater.service';
import { ShowService } from './services/show.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { AuthInterceptor } from './services/auth-interceptor';
// component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//movies component 
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieNewComponent } from './movies/movie-new/movie-new.component';
import { MovieListDisplayComponent } from './movies/movie-list-display/movie-list-display.component';
import { MoviesBestSellersComponent } from './movies/movies-best-sellers/movies-best-sellers.component';
import { MoviesCaruselaComponent } from './movies/movies-carusela/movies-carusela.component';

//theater component
import { TheaterListComponent } from './theaters/theater-list/theater-list.component';
import { TheaterNewComponent } from './theaters/theater-new/theater-new.component';
import { TheaterDetailsComponent } from './theaters/theater-details/theater-details.component';
import { TheaterEditComponent } from './theaters/theater-edit/theater-edit.component';
//show component
import { ShowListComponent } from './shows/show-list/show-list.component';
import { ShowDetailsComponent } from './shows/show-details/show-details.component';
import { ShowNewComponent } from './shows/show-new/show-new.component';
import { ShowEditComponent } from './shows/show-edit/show-edit.component';
import { ShowNextComponent } from './shows/show-next/show-next.component';

//order component
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { QuickOrderComponent } from './orders/quick-order/quick-order.component';
import { OrderSeatsComponent } from './orders/order-seats/order-seats.component';
import { OrderConfirmationComponent } from './orders/order-confirmation/order-confirmation.component';

//users component
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
//file upload
import { FileUploadModule } from 'ng2-file-upload';
//directive
import { TheaterMapDirective } from './directive/theater-map.directive';

//other
import { LoadingService } from './services/loading.service';
import { AuthGuard } from './services/auth.guard';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListDisplayComponent } from './users/user-list-display/user-list-display.component';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { TheaterFormComponent } from './theaters/theater-form/theater-form.component';
import { ShowFormComponent } from './shows/show-form/show-form.component';


ShowService
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    MovieEditComponent,
    MovieNewComponent,
    TheaterListComponent,
    TheaterNewComponent,
    TheaterDetailsComponent,
    TheaterEditComponent,
    ShowListComponent,
    ShowDetailsComponent,
    ShowNewComponent,
    ShowEditComponent,
    OrderDetailsComponent,
    OrderListComponent,
    OrderEditComponent,
    QuickOrderComponent,
    TheaterMapDirective,
    OrderSeatsComponent,
    ShowNextComponent,
    MovieListDisplayComponent,
    MoviesBestSellersComponent,
    UserLoginComponent,
    UserSignupComponent,
    OrderConfirmationComponent,
    MoviesCaruselaComponent,
    UserListComponent,
    UserDetailsComponent,
    UserListDisplayComponent,
    MovieFormComponent,
    TheaterFormComponent,
    ShowFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    FilterPipeModule,
    ReactiveFormsModule
  ],
  providers: [
    MoviesService,
    TheaterService,
    ShowService,
    OrdersService,
    UsersService,
    AuthGuard,
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
