import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

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
});