/**
 * 生成类似 github 像素头像
 */
// 取自中国色
const COLORS = [
    { hex: '#f47983', name: '桃红' },
    { hex: '#f00056', name: '品红' },
    { hex: '#db5a6b', name: '海棠红' },
    { hex: '#f20c00', name: '石榴红' },
    { hex: '#c93756', name: '樱桃色' },
    { hex: '#9d2933', name: '胭脂' },
    { hex: '#ef7a82', name: '嫣红' },
    { hex: '#8c4356', name: '绛紫' },
    { hex: '#f9906f', name: '酡颜' },
    { hex: '#faff72', name: '鸭黄' },
    { hex: '#ff8c31', name: '杏红' },
    { hex: '#ff8936', name: '橘黄' },
    { hex: '#ffc773', name: '姜黄' },
    { hex: '#bddd22', name: '嫩绿' },
    { hex: '#afdd22', name: '柳绿' },
    { hex: '#789262', name: '竹青' },
    { hex: '#0aa344', name: '青葱' },
    { hex: '#1bd1a5', name: '碧色' },
    { hex: '#44cef6', name: '蓝' },
    { hex: '#177cb0', name: '靛青' },
    { hex: '#065279', name: '靛蓝' },
    { hex: '#3eede7', name: '碧蓝' },
    { hex: '#70f3ff', name: '蔚蓝' },
    { hex: '#4b5cc4', name: '宝蓝' },
    { hex: '#2e4e7e', name: '藏青' },
    { hex: '#bbcdc5', name: '蟹壳青' },
    { hex: '#3b2e7e', name: '藏蓝' },
    { hex: '#426666', name: '黛绿' },
    { hex: '#574266', name: '黛紫' },
    { hex: '#8d4bbb', name: '紫色' },
    { hex: '#815463', name: '紫酱' },
    { hex: '#815476', name: '酱紫' },
    { hex: '#4c221b', name: '紫檀' },
    { hex: '#003371', name: '绀青绀紫' },
    { hex: '#56004f', name: '紫棠' },
    { hex: '#801dae', name: '青莲' },
    { hex: '#4c8dae', name: '群青' },
    { hex: '#b0a4e3', name: '雪青' },
    { hex: '#cca4e3', name: '丁香色' },
    { hex: '#edd1d8', name: '藕色' },
    { hex: '#e4c6d0', name: '藕荷色' },
    { hex: '#758a99', name: '墨灰' },
    { hex: '#312520', name: '煤黑' },
    { hex: '#75664d', name: '黎' },
    { hex: '#665757', name: '黝黑' },
    { hex: '#41555d', name: '黯' },
];

class GHAT {
    w: number;
    h: number;
    PARTITIONS: number;
    BASE_SEED: number;
    SEED_H: number;
    draw?: CanvasRenderingContext2D | null;
    fillStyle?: string;
    SEED_W: number;

    constructor(w = 96) {
        this.w = w;
        this.h = w; //h;

        this.PARTITIONS = 9;
        this.BASE_SEED = 9;
        this.SEED_H = this.h / this.BASE_SEED;
        this.SEED_W = this.w / this.BASE_SEED;
    }

    getImage(md5Str: string) {
        if (typeof document === 'undefined') {
            return null;
        }
        const element: HTMLCanvasElement = document.createElement('canvas');
        if (!element.getContext) {
            throw new Error('Canvas does not supported');
        }
        element.width = this.w;
        element.height = this.h;
        this.draw = element.getContext('2d');
        if (this.draw) {
            const { grid, color } = this.md5CovertToGridAndColor(md5Str);
            this.draw.fillStyle = this.fillStyle || color;
            this.map(this.grid(grid));
            return element.toDataURL('image/png');
        }
        return null;
    }

    md5CovertToGridAndColor(md5Str: string) {
        const arr = new Array(this.PARTITIONS * this.BASE_SEED).fill(false);
        const cArr: number[] = [0, 0, 0];
        for (let i = 0; i < md5Str.length; i++) {
            arr[i % (this.PARTITIONS * this.BASE_SEED)] = md5Str.charCodeAt(i) % 2 === 0;
            cArr[i % 3] += md5Str.charCodeAt(i);
        }
        return {
            grid: arr,
            color: COLORS[(cArr[0] + cArr[1] + cArr[2]) % COLORS.length].hex,
        };
    }

    drawImage(...args: number[]) {
        if (this.draw) {
            this.draw.fillRect(args[0], args[1], args[2], args[3]);
        }
    }

    map(grid: number[][] | boolean[][]) {
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

    grid(md5Grid: boolean[]) {
        const map: boolean[][] = [];
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
