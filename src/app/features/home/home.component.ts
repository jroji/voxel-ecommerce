import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Breed } from '@models/breed/breed.model';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, scan, share, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { BreedService } from './services/breed.service';

@Component({
  selector: 'voxel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /** Breed list to be rendered */
  public breeds$?: Observable<Breed[]>;
  public breeds?: Breed[] = [];
  private requestData$: Subject<number> = new Subject();
  public searchInput = new FormControl('');

  private readonly clearSubscription$: Subject<void> = new Subject();
  private infiniteScrollObserver?: IntersectionObserver;

  @ViewChild('anchor') anchor?: ElementRef<HTMLElement>;

  constructor(private breedService: BreedService) {}

  ngOnInit() {
    const breedListFetch$ = this.getScrollingListData();
    const inputSearchBreeds$ = this.getInputSearch(breedListFetch$);

    this.breeds$ = merge(
      breedListFetch$,
      inputSearchBreeds$
    ).pipe(takeUntil(this.clearSubscription$))
  }

  ngAfterViewInit() {
    this.observeAnchor();
  }

  private getScrollingListData() {
    return this.requestData$
      .pipe(
        scan((totalPages, page) => totalPages + page, -1),
        distinctUntilChanged(),
        mergeMap((page) => this.breedService.getBreeds(page)),
        share(),
      )
  }

  private observeAnchor() {
    if (!this.anchor) { return; }
    this.infiniteScrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.searchInput.value === '') {
        this.requestData$.next(1);
      }
    });
    this.infiniteScrollObserver.observe(this.anchor.nativeElement);
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

  public trackById(index: number, breed: Breed) {
    return breed.id;
  }

  ngOnDestroy() {
    this.clearSubscription$.next();
    this.clearSubscription$.complete();
  }
}