const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

class SpatialHashMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.grid = new Array(width * height).fill(null).map(() => []);
  }

  clear() {
    this.grid.forEach(cell => {
      cell.splice(0);
    });
  }

  add(x, y, data) {
    x = clamp(Math.round(x), 0, this.width - 1);
    y = clamp(Math.round(y), 0, this.height - 1);

    const index = x + y * this.width;
    this.grid[index].push(data);
  }

  query(x, y, radius) {
    if (radius) {
      return this.queryWithRadius(x, y, radius);
    }

    x = clamp(Math.round(x), 0, this.width - 1);
    y = clamp(Math.round(y), 0, this.height - 1);

    const index = x + y * this.width;
    return this.grid[index];
  }

  queryWithRadius(x, y, radius) {
    const left = Math.max(Math.round(x - radius), 0);
    const right = Math.min(Math.round(x + radius), this.width - 1);
    const bottom = Math.max(Math.round(y - radius), 0);
    const top = Math.min(Math.round(y + radius), this.height - 1);

    const result = [];

    for (let i = left; i <= right; i++) {
      for (let j = bottom; j <= top; j++) {
        const query = this.query(i, j);
        for (let k = 0; k < query.length; k++) {
          result.push(query[k]);
        }
      }
    }

    return result;
  }
}

export default SpatialHashMap;