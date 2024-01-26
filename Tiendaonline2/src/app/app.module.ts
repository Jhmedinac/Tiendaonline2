
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { SwiperDirective } from './directives/swiper.directive';

// Step 1: Add the following line...
import { register } from 'swiper/element/bundle';
import { ComponentsComponent } from './components/components.component';
import { PagesComponent } from './pages/pages.component';
import { ProductComponent } from './components/product/product.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

// Swiper
register();

@NgModule({
  declarations: [
    AppComponent,
    SwiperDirective,
    ComponentsComponent,
    PagesComponent,
    ProductComponent,
    CarruselComponent,
    ProductCardComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
