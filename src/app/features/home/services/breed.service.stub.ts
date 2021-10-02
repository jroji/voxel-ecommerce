import { Observable, of } from "rxjs";
import { Breed } from "@models/breed/breed.model";
import { BREEDS } from "@models/breed/breed.mock";

export class BreedServiceStub {
  getBreeds(): Observable<Breed[]> {
    return of(BREEDS);
  }
}