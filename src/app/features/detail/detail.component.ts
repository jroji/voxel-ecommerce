import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breed, BreedStringAccessor } from '@models/breed/breed.model';
import { Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BreedService } from '../home/services/breed.service';

export const PROGRESS_FIELDS = [
  'energy_level',
  'intelligence',
  'child_friendly',
  'adaptability',
  'health_issues'
];

@Component({
  selector: 'voxel-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  public breed?: Breed;
  public progressFields: number[] = [];
  private readonly clearSubscription$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private breedService: BreedService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map(params => params.id),
        switchMap(breedId => this.breedService.getBreed(breedId)),
        tap((breed: Breed) => this.setProgressFields(breed as BreedStringAccessor)),
      )
      .subscribe(breed => {
        console.log(breed);
        this.breed = breed;
      });
  }

  private setProgressFields(breed: BreedStringAccessor) {
    this.progressFields = PROGRESS_FIELDS.map((progress: string) => {
      return breed[progress] as number;
    });
  }

  ngOnDestroy() {
    this.clearSubscription$.next();
    this.clearSubscription$.complete();
  }

}
