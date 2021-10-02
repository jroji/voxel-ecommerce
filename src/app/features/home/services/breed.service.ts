import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed } from '@models/breed/breed.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

// Estos valores podemos sacarlos a archivo de environments
export const BASE_URL = 'https://api.thecatapi.com/v1';
export const DEFAULT_LIMIT = 10;

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private breedsCache$?: Observable<Breed[]>;

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    if (!this.breedsCache$) {
      this.breedsCache$ = (this.http.get(`${BASE_URL}/breeds?limit=${DEFAULT_LIMIT}`) as Observable<Breed[]>).pipe(
        shareReplay(1)
      );
    }
    return this.breedsCache$;
  }

  searchBreeds(searchTerm: string): Observable<Breed[]> {
    return this.http.get(`${BASE_URL}/breeds/search?q=${searchTerm}`) as Observable<Breed[]>;
  }
}