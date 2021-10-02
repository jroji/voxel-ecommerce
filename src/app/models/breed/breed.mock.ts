import {
  Breed
} from "./breed.model";

export const AEGEAN: Breed = {
  "weight": {
    "imperial": "7 - 10",
    "metric": "3 - 5"
  },
  "id": "aege",
  "name": "Aegean",
  "vetstreet_url": "http://www.vetstreet.com/cats/aegean-cat",
  "temperament": "Affectionate, Social, Intelligent, Playful, Active",
  "origin": "Greece",
  "country_codes": "GR",
  "country_code": "GR",
  "description": "Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.",
  "life_span": "9 - 12",
  "indoor": 0,
  "alt_names": "",
  "adaptability": 5,
  "affection_level": 4,
  "child_friendly": 4,
  "dog_friendly": 4,
  "energy_level": 5,
  "grooming": 3,
  "health_issues": 1,
  "intelligence": 3,
  "shedding_level": 3,
  "social_needs": 4,
  "stranger_friendly": 4,
  "vocalisation": 3,
  "experimental": 0,
  "hairless": 0,
  "natural": 0,
  "rare": 0,
  "rex": 0,
  "suppressed_tail": 0,
  "short_legs": 0,
  "wikipedia_url": "https://en.wikipedia.org/wiki/Aegean_cat",
  "hypoallergenic": 0,
  "reference_image_id": "ozEvzdVM-",
  "image": {
    "id": "ozEvzdVM-",
    "width": 1200,
    "height": 800,
    "url": "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg"
  }
}

export const BAMBINO = {
  "weight": {
    "imperial": "4 - 9",
    "metric": "2 - 4"
  },
  "id": "bamb",
  "name": "Bambino",
  "temperament": "Affectionate, Lively, Friendly, Intelligent",
  "origin": "United States",
  "country_codes": "US",
  "country_code": "US",
  "description": "The Bambino is a breed of cat that was created as a cross between the Sphynx and the Munchkin breeds. The Bambino cat has short legs, large upright ears, and is usually hairless. They love to be handled and cuddled up on the laps of their family members.",
  "life_span": "12 - 14",
  "indoor": 0,
  "lap": 1,
  "alt_names": "",
  "adaptability": 5,
  "affection_level": 5,
  "child_friendly": 4,
  "dog_friendly": 5,
  "energy_level": 5,
  "grooming": 1,
  "health_issues": 1,
  "intelligence": 5,
  "shedding_level": 1,
  "social_needs": 3,
  "stranger_friendly": 3,
  "vocalisation": 3,
  "experimental": 1,
  "hairless": 1,
  "natural": 0,
  "rare": 0,
  "rex": 0,
  "suppressed_tail": 0,
  "short_legs": 1,
  "wikipedia_url": "https://en.wikipedia.org/wiki/Bambino_cat",
  "hypoallergenic": 0,
  "reference_image_id": "5AdhMjeEu",
  "image": {
    "id": "5AdhMjeEu",
    "width": 1296,
    "height": 1030,
    "url": "https://cdn2.thecatapi.com/images/5AdhMjeEu.jpg"
  }
}

export const BREEDS: Breed[] = [
  AEGEAN,
  BAMBINO
];
