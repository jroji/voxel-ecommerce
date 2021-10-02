import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Breed } from '@models/breed/breed.model';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { BreedService } from './services/breed.service';

@Component({
  selector: 'voxel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /** Breed list to be rendered */
  public breeds$?: Observable<Breed[]>;
  public searchInput = new FormControl();

  private readonly clearSubscription$: Subject<void> = new Subject();

  constructor(private breedService: BreedService) {}

  ngOnInit() {
    const initialBreedsFetch$ = this.breedService.getBreeds();
    const inputSearchBreeds$ = this.getInputSearch(initialBreedsFetch$);

    this.breeds$ = merge(
      initialBreedsFetch$,
      inputSearchBreeds$
    ).pipe(takeUntil(this.clearSubscription$))
  }

  private getInputSearch(initialFetch$: Observable<Breed[]>) {
    return this.searchInput.valueChanges
      .pipe(
        // Espera 500ms entre emisiones, en caso de llegar una nueva cancela la anterior
        debounceTime(500),
        // Filtra la emisión si es igual que la anterior (==)
        distinctUntilChanged(),
        // Recoge el último valor emitido por el observable anterior
        withLatestFrom(initialFetch$),
        // Conecta la emisión del stream con la del nuevo observable
        // Además, si llega una emisión antes de que emita, cancela la anterior
        switchMap(([value, list]) => value !== ''
          ? this.breedService.searchBreeds(value)
          : of(list)
        ),
      );
  }


  ngOnDestroy() {
    this.clearSubscription$.next();
    this.clearSubscription$.complete();
  }
}