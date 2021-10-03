import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BREEDS } from '@models/breed/breed.mock';
import { createComponentFactory, byRole, byTestId } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { BreedService } from '../home/services/breed.service';
import { BreedServiceStub } from '../home/services/breed.service.stub';
import { ProgressComponent } from './components/progress/progress.component';
import { DetailComponent, PROGRESS_FIELDS } from './detail.component';

describe('DetailComponent', () => {
  const createComponent = createComponentFactory({
    component: DetailComponent,
    declarations: [MockComponent(ProgressComponent)],
    providers: [
      { provide: BreedService, useClass: BreedServiceStub },
      { provide: ActivatedRoute, useValue: { params: of({ id: 1 })}}
    ]
  });

  it('should request the route id as the breed id', fakeAsync(() => {
    const spectator = createComponent({
      detectChanges: false,
    });
    const service = spectator.inject(BreedService);
    const spy = jest.spyOn(service, 'getBreed');
    spectator.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it('should show the breed image', () => {
    const spectator = createComponent();
    const image = spectator.query(byRole('img'));
    expect(image).toBeVisible();
    expect(image).toHaveAttribute('src', BREEDS[0].image.url);
  });

  it('should show N progress elements', () => {
    const spectator = createComponent();
    const progressList = spectator.queryAll(byTestId('progress'));
    expect(progressList).toHaveLength(PROGRESS_FIELDS.length);
  });
});
