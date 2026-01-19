import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private _token = signal<string | null>(localStorage.getItem('access_token'));
    readonly token = this._token.asReadonly();
    private apiUrl = environment.apiUrl + '/Auth';

    getAuthToken(): string | null {
        return this.token();
    }

    login(credentials: { username: string; password: string }) {
        return this.http.post<{ token: string; username: string }>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    this._token.set(response.token);
                    localStorage.setItem('access_token', response.token);
                })
            );
    }

    logout(): void {
        this._token.set(null);
        localStorage.removeItem('access_token');
    }
}
