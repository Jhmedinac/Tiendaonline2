import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../servicios/product.service';
import { map } from 'rxjs/operators';
import { CartService } from '../../servicios/cart.service';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: number = 0;
  product: any;
  products: Product[] = [];
  quantity: number = 0;
  showcaseImages: any[] = [];
  loading = false;

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((productId) => {
        // returns string so convert it to number
        this.id = parseInt(productId);
        this._product.GetProductoId(productId).subscribe((data) => {
          console.log(data);
          this.products = data as any[]; // Change the type to any[]
          if (this.product.quantity === 0) this.quantity = 0;
          else this.quantity = 1;

          if (this.product.images) {
            this.showcaseImages = this.product.images.split(';');
          }
          this.loading = false;
        });
      });
  }

  addToCart(): void {
    this._cart.addProduct({
      id: this.id,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.image,
      title: this.product.title,
      maxQuantity: this.product.quantity,
    });
  }
}
