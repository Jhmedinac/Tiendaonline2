import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData = {
    products: [],
    total: 0,
  };

  cartDataObs$ = new BehaviorSubject(this.cartData);

  constructor(
    private _notification: NzNotificationService,
    private _api: ApiService
  ) {
    let localCartData = localStorage.getItem('cart');
    if (localCartData) {
      this.cartData = JSON.parse(localCartData);
    }

    this.cartDataObs$.next(this.cartData);
  }

  // submitCheckout(userId: number, cart: any) {
  //   return this._api.postTypeRequest('orders/create', {
  //     userId: userId,
  //     cart: cart,
  //   });
  // }

  addProduct(params: any): void {
    const { id, price, quantity, image, title, maxQuantity } = params;
    const product = { id, price, quantity, image, title, maxQuantity };

    if (!this.isProductInCart(id)) {
      if (quantity) this.cartData.products.push(product as never);
      else this.cartData.products.push({ ...product, quantity: 1 } as never);
    } else {
      // copy array, find item index and update
      let updatedProducts: any[] = [...this.cartData.products];
      let productIndex = updatedProducts.findIndex((prod) => prod.id == id);
      let product = updatedProducts[productIndex];

      // if no quantity, increment
      if (quantity) {
        updatedProducts[productIndex] = {
          ...product,
          quantity: quantity,
        } as never;
      } else {
        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity + 1,
        } as never;
      }

      console.log(updatedProducts);
      this.cartData.products = updatedProducts as never[];
    }

    this.cartData.total = this.getCartTotal();
    this._notification.create(
      'success',
      'Product added to cart',
      `${title} was successfully added to the cart`
    );
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  updateCart(id: number, quantity: number): void {
    // copy array, find item index and update
    let updatedProducts: any[] = [...this.cartData.products];
    let productIndex = updatedProducts.findIndex((prod) => prod.id == id);

    updatedProducts[productIndex].quantity = quantity;

    this.cartData.products = updatedProducts as never[];
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    console.log(this.cartData.products);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  removeProduct(id: number): void {
    let updatedProducts: never[] = this.cartData.products.filter(
      (prod: any) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));

    this._notification.create(
      'success',
      'Removed successfully',
      'The selected item was removed from the cart successfully'
    );
  }

  clearCart(): void {
    this.cartData = {
      products: [],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  getCartTotal(): number {
    let totalSum = 0;
    this.cartData.products.forEach(
      (prod: any) => (totalSum += prod.price * prod.quantity)
    );

    return totalSum;
  }

  isProductInCart(id: number): boolean {
    return this.cartData.products.findIndex((prod: any) => prod.id === id) !== -1;
  }
}
