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
});