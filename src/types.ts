export interface Coordinates {
  x: number;
  y: number;
}

export interface GameMap {
  map: {
    height: number;
    width: number;
    spawnPoint: Coordinates;
    objects: [[]];
  };
}

export interface GamePlayer {
  id: string;
  username: string;
  level: number;
  coords: Coordinates;
}

export interface Colors {
  lava: string;
  wall: string;
  water: string;
}
