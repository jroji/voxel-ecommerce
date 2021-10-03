import { AEGEAN } from '@models/breed/breed.mock';
import { BreedImageResponse } from '@models/breed/breed.model';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { of } from 'rxjs';

import { BASE_URL, BreedService, DEFAULT_LIMIT } from './breed.service';

describe('BreedService', () => {
  let spectator: SpectatorHttp<BreedService>;
  const createService = createHttpFactory(BreedService);

  beforeEach(() => spectator = createService());

  it('should request breed data with specified limit by default', () => {
    spectator.service.getBreeds().subscribe();
    spectator.expectOne(`${BASE_URL}/breeds?limit=${DEFAULT_LIMIT}`, HttpMethod.GET);
  });

  it('should not request breed data twice', () => {
    const spy = jest.spyOn(spectator.httpClient, 'get');
    spectator.service.getBreeds().subscribe();
    spectator.service.getBreeds().subscribe();
    spectator.expectOne(`${BASE_URL}/breeds?limit=${DEFAULT_LIMIT}`, HttpMethod.GET);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should request search with the requested text', () => {
    const searchTerm = 'test';
    spectator.service.searchBreeds(searchTerm).subscribe();
    spectator.expectOne(`${BASE_URL}/breeds/search?q=${searchTerm}`, HttpMethod.GET);
  });

  it('should request search for the specified breed', () => {
    const searchTerm = 'beng';
    spectator.service.getBreed(searchTerm).subscribe();
    spectator.expectOne(`${BASE_URL}/images/search?breed_id=${searchTerm}`, HttpMethod.GET);
  });

  it('should return one Breed data', (done) => {
    const response: BreedImageResponse[] = [{ breeds: [AEGEAN], width: 0, height: 0, url: '', id: 'a' }];
    const searchTerm = 'beng';
    const spy = jest.spyOn(spectator.httpClient, 'get').mockReturnValue(of(response));
    spectator.service.getBreed(searchTerm).subscribe(data => {
      expect(data.id).toBe('aege');
      done();
    });
  });
});