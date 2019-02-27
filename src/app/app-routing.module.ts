import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
//movies component 
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieNewComponent } from './movies/movie-new/movie-new.component';
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

//users

import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';


const routes: Routes = [
  

  {
    path: "register",
    component: UserSignupComponent 
  },
  {
    path: "login",
    component: UserLoginComponent 
  },
  {
    path: "users",
    component: UserListComponent,
    canActivate: [AdminGuard], 
  },
  {
    path: "users/:id",
    component: UserDetailsComponent,
    canActivate: [AdminGuard], 
  },
  {
    path: "orders",
    component: OrderListComponent,
    canActivate: [AdminGuard], 
  },
  {
    path: "orders/add",
    component:QuickOrderComponent  
  },
  {
    path: "orders/choose-seats",
    component:OrderSeatsComponent,
    canActivate: [AuthGuard]   
  },

  {
    path: "orders/:id",
    component: OrderConfirmationComponent 
  },
  {
    path: "theaters",
    component: TheaterListComponent,
    canActivate: [AdminGuard] 
  },
    {
    path: "theaters/add",
    component: TheaterNewComponent,
    canActivate: [AdminGuard] 
  },
  {
    path: "theaters/edit/:id",
    component: TheaterEditComponent,
    canActivate: [AdminGuard]  
  },
   {
    path: "shows",
    component: ShowListComponent,
    canActivate: [AdminGuard] 
  },
  {
    path: "show-next",
    component: ShowNextComponent 
  },

  {
    path: "shows/add",
    component: ShowNewComponent,
    canActivate: [AdminGuard] 
  },
  {
    path: "shows/:id",
    component: ShowDetailsComponent 
  },

  {
    path: "movies",
    component: MoviesListComponent,
    canActivate: [AdminGuard],  
  },
  {
    path: "movies/add",
    component: MovieNewComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "movies/edit/:id",
    component: MovieEditComponent,
    canActivate: [AdminGuard] 
  },
  {
    path: "movies/:id",
    component: MovieDetailsComponent 
  },
  {
    path: "",
    component: HomeComponent 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,AdminGuard]
})
export class AppRoutingModule { }
