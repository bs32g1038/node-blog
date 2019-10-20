class Color {
    constructor(r, g, b, a = 1) {
        this.r = r || Math.floor(Math.random() * 200);
        this.g = g || Math.floor(Math.random() * 200);
        this.b = b || Math.floor(Math.random() * 200);
        this.a = a;
    }
    rgba() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}

class GHAT {
    constructor(w = 420) {
        this.w = w;
        this.h = w; //h;

        this.PARTITIONS = 7;
        this.BASE_SEED = 7;
        this.SEED_H = this.h / this.BASE_SEED;
        this.SEED_W = this.w / this.BASE_SEED;
    }

    getImage(md5Str) {
        if (typeof document === 'undefined') {
            return null;
        }
        const element = document.createElement('canvas');
        if (!element.getContext) {
            throw new Error('Canvas does not supported');
        }
        element.width = this.w;
        element.height = this.h;
        this.draw = element.getContext('2d');
        if (this.draw) {
            const { grid, color } = this.md5CovertToGridAndColor(md5Str);
            this.draw.fillStyle = this.fillStyle || new Color(color.r, color.g, color.b).rgba();
            this.map(this.grid(grid));
            return element.toDataURL('image/png');
        }
        return null;
    }

    md5CovertToGridAndColor(md5Str) {
        const arr = new Array(this.PARTITIONS * this.BASE_SEED).fill(false);
        const cArr = [0, 0, 0];
        for (let i = 0; i < md5Str.length; i++) {
            arr[i % (this.PARTITIONS * this.BASE_SEED)] = md5Str.charCodeAt(i) % 2 === 0;
            cArr[i % 3] += md5Str.charCodeAt(i);
        }
        return {
            grid: arr,
            color: {
                r: cArr[0] % 240,
                g: cArr[1] % 240,
                b: cArr[2] % 240,
            },
        };
    }

    drawImage(...args) {
        if (this.draw) {
            this.draw.fillRect(args[0], args[1], args[2], args[3]);
        }
    }

    map(grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === true) {
                    this.drawImage(this.SEED_H * y, this.SEED_W * x, this.SEED_W, this.SEED_H);
                    if (y < this.PARTITIONS - 1) {
                        this.drawImage(
                            this.SEED_H * (this.PARTITIONS + 1 - y),
                            this.SEED_W * x,
                            this.SEED_W,
                            this.SEED_H
                        );
                    }
                }
            }
        }
    }

    grid(md5Grid) {
        const map = [];
        for (let y = 0; y < this.PARTITIONS; y++) {
            map[y] = [];
            for (let x = 0; x < this.BASE_SEED; x++) {
                map[y][x] = md5Grid[x * y + x];
            }
        }
        return map;
    }
}

export default GHAT;
