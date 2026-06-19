import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { MOCK_PRODUCTS } from '../models/product.mock';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return of(product);
  }
}
