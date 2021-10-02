import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed } from '@models/breed/breed.model';
import { Observable, ReplaySubject } from 'rxjs';
import { scan, share, shareReplay } from 'rxjs/operators';

// Estos valores podemos sacarlos a archivo de environments
export const BASE_URL = 'https://api.thecatapi.com/v1';
export const DEFAULT_LIMIT = 10;

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private breedsCache$ = new ReplaySubject<Breed[]>();

  constructor(private http: HttpClient) { }

  getBreeds(page: number = 0): Observable<Breed[]> {
    this.fetchBreeds(page);
    return this.breedsCache$
      .pipe(
        share(),
        scan((breedList, breeds) => [...breedList, ...breeds])
      );
  }

  searchBreeds(searchTerm: string): Observable<Breed[]> {
    return this.http.get(`${BASE_URL}/breeds/search?q=${searchTerm}`) as Observable<Breed[]>;
  }

  private fetchBreeds(page: number) {
    this.http.get(`${BASE_URL}/breeds?limit=${DEFAULT_LIMIT}&page=${page}`)
      .subscribe(breeds => this.breedsCache$.next(breeds as Breed[]));
  }
}