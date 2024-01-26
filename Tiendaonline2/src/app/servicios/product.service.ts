import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
// import { Products, Product } from '../shared/models/product.model';
// import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 //constructor() { }
 constructor( private http: HttpClient) { }

 GetProducto(categoria: string) {
   return this.http.get(`https://fakestoreapi.com/products/category/${categoria}`);
}


GetProductoId(Id: number) {
 return this.http.get(`https://fakestoreapi.com/products/category/${Id}`);
}

}

