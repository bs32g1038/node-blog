import Crood from './crood';

// 流星
class ShootingStar {

    public init: any;
    public final: any;
    public size: any;
    public speed: any;
    public dur: any;
    public pass: any;
    public prev: any;
    public now: any;
    public onDistory: any;
    constructor(init: any = new Crood(), final: any = new Crood(), size: any = 3, speed: any= 200, onDistory: any = null) {
        this.init = init; // 初始位置
        this.final = final; // 最终位置
        this.size = size; // 大小
        this.speed = speed; // 速度：像素/s

        // 飞行总时间
        this.dur = Math.sqrt(Math.pow(this.final.x - this.init.x, 2) + Math.pow(this.final.y - this.init.y, 2)) * 1000 / this.speed;

        this.pass = 0; // 已过去的时间
        this.prev = this.init.copy(); // 上一帧位置
        this.now = this.init.copy(); // 当前位置
        this.onDistory = onDistory;
    }
    public draw(ctx: any, delta: any) {
        this.pass += delta;
        this.pass = Math.min(this.pass, this.dur);

        const percent = this.pass / this.dur;

        this.now.setCrood(
            this.init.x + (this.final.x - this.init.x) * percent,
            this.init.y + (this.final.y - this.init.y) * percent
        );

        // canvas
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.now.x, this.now.y);
        ctx.lineTo(this.prev.x, this.prev.y);
        ctx.stroke();

        this.prev.setCrood(this.now.x, this.now.y);
        if (this.pass === this.dur) {
            this.distory();
        }
    }
    public distory() {
        if (this.onDistory) {
            this.onDistory();
        }
    }
}

export default ShootingStar;