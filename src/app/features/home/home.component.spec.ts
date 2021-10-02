import { HomeComponent } from "./home.component";
import { createComponentFactory, Spectator } from "@ngneat/spectator/jest";
import { byRole } from '@ngneat/spectator/jest';
import { CardComponent } from "@voxel-ui/card";
import { MockComponent, ngMocks } from "ng-mocks";
import { BreedService } from "./services/breed.service";
import { AEGEAN, BREEDS } from "@models/breed/breed.mock";
import { Breed } from "@models/breed/breed.model";
import { BreedServiceStub } from "./services/breed.service.stub";
import { RouterTestingModule } from "@angular/router/testing";
import { DetailComponent } from "../detail/detail.component";
import { Location } from "@angular/common";

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
      // Helper de Angular para testing con rutas
      RouterTestingModule.withRoutes([
        {
          path: 'detail',
          component: MockComponent(DetailComponent)
        }
      ])
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should show a card for each breed', () => {
    const breeds: Breed[] = BREEDS;
    spectator.component.breeds = breeds;
    spectator.detectChanges();
    const cards = spectator.queryAll(byRole('article'));
    expect(cards.length).toBe(breeds.length);
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
    expect(spectator.inject(Location).path()).toBe('/detail');
  });

  it('should show as featured the card with a breed with a score of 5', () => {
    const spectator = createComponent();
    spectator.component.breeds = [AEGEAN];

    spectator.detectChanges();
		const mockComponent = ngMocks.findInstance(CardComponent);
    expect(mockComponent.isFeatured).toBeTruthy();
  });
});