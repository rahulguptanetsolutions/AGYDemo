import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl + '/products';

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    saveProduct(product: Product | Omit<Product, 'id'>): Observable<Product> {
        if ('id' in product && product.id > 0) {
            return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
        } else {
            return this.http.post<Product>(this.apiUrl, product);
        }
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
