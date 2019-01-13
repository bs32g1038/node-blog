// 坐标

class Crood {
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    public setCrood(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public copy() {
        return new Crood(this.x, this.y);
    }
}

export default Crood;