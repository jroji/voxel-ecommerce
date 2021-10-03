import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed, BreedImageResponse } from '@models/breed/breed.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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

  getBreed(breedId: string) {
    return (this.http.get(`${BASE_URL}/images/search?breed_id=${breedId}`) as Observable<BreedImageResponse[]>)
      .pipe(
        map((response: BreedImageResponse[]) => {
          const { breeds, ...image  } = response[0];
          return {
            ...breeds[0],
            image
          }
        })
      );
  }
}