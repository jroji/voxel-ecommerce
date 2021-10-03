import { Observable, of } from "rxjs";
import { Breed } from "@models/breed/breed.model";
import { AEGEAN, BREEDS } from "@models/breed/breed.mock";

export class BreedServiceStub {
  getBreeds(): Observable<Breed[]> {
    return of(BREEDS);
  }
  getBreed(): Observable<Breed> {
    return of(AEGEAN);
  }
  searchBreeds(): Observable<Breed[]> {
    return of([AEGEAN]);
  }
}