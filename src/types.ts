export interface GameMap {
  map: {
    height: number;
    width: number;
    spawnPoint: {
      x: number;
      y: number;
    };
    objects: [[]];
  };
}
