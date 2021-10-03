import { HomeComponent } from "./home.component";
import { createComponentFactory, Spectator } from "@ngneat/spectator/jest";
import { byRole } from '@ngneat/spectator/jest';
import { CardComponent } from "@voxel-ui/card";
import { MockComponent, ngMocks } from "ng-mocks";
import { BreedService } from "./services/breed.service";
import { BREEDS } from "@models/breed/breed.mock";
import { BreedServiceStub } from "./services/breed.service.stub";
import { RouterTestingModule } from "@angular/router/testing";
import { DetailComponent } from "../detail/detail.component";
import { Location } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { fakeAsync } from "@angular/core/testing";

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>
  const createComponent = createComponentFactory({
    providers: [{ provide: BreedService, useClass: BreedServiceStub }],
		declarations: [
      MockComponent(CardComponent),
      MockComponent(DetailComponent)
    ],
    component: HomeComponent,
    imports: [
      ReactiveFormsModule,
      // Helper de Angular para testing con rutas
      RouterTestingModule.withRoutes([
        {
          path: 'detail/:id',
          component: MockComponent(DetailComponent)
        }
      ])
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should show a card for each breed', () => {
    const spectator = createComponent();
    spectator.detectChanges();
    const cards = spectator.queryAll(byRole('article'));
    expect(cards.length).toBe(BREEDS.length);
  });

  it('should show as featured the card with a breed with a score of 5', () => {
    const spectator = createComponent();
    spectator.detectChanges();
    const mockComponent = ngMocks.findInstance(CardComponent);
    expect(mockComponent.isFeatured).toBeTruthy();
  });

  it('should request breeds to BreedService on component instantation', () => {
    const spectator = createComponent({
      // Para evitar que el OnInit salte antes de crear el espia
      detectChanges: false,
    });
    const service = spectator.inject(BreedService);
    const spy = jest.spyOn(service, 'getBreeds');
    spectator.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to breed on card click', () => {
    const spectator = createComponent();
    spectator.click(byRole('article'));
    spectator.fixture.whenStable();
    expect(spectator.inject(Location).path()).toBe(`/detail/${BREEDS[0].id}`);
  });

  it('should request new breeds on input', fakeAsync(() => {
    const spectator = createComponent();
    const service = spectator.inject(BreedService);
    const spy = jest.spyOn(service, 'searchBreeds');
    spectator.typeInElement('abc', 'input');
    spectator.tick(1000);
    expect(spy).toHaveBeenCalledWith('abc');
  }));

  it('should return empty list if search results are empty', fakeAsync(() => {
    const spectator = createComponent();
    const service = spectator.inject(BreedService);
    let breeds;
    spectator.component.breeds$?.subscribe(result => breeds = result);

    jest.spyOn(service, 'searchBreeds').mockReturnValue(of([]));
    spectator.typeInElement('a', 'input');
    spectator.tick(1000);

    expect(spectator.query(byRole('article'))).not.toExist();
  }));
});