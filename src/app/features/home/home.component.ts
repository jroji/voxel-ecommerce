import { Component, OnInit } from '@angular/core';
import { Breed } from '@models/breed/breed.model';
import { BreedService } from './services/breed.service';

@Component({
  selector: 'voxel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /** Breed list to be rendered */
  public breeds: Breed[] = [];

  constructor(private breedService: BreedService) {}

  ngOnInit() {
    this.breedService.getBreeds()
      .subscribe((breeds: Breed[]) => this.breeds = breeds);
  }
}