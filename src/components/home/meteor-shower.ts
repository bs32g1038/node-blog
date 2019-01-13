import Crood from './crood';
import ShootingStar from './shooting-star';

// 流星雨
class MeteorShower {
    public cvs: any;
    public ctx: any;
    public stars: any;
    public T: any;
    public isStop: boolean;
    public playing: any;

    constructor(cvs: any, ctx: any) {
        this.cvs = cvs;
        this.ctx = ctx;
        this.stars = [];
        this.isStop = false;
        this.playing = false;
    }

    // 生成随机位置的流星
    public createStar() {
        const angle = Math.PI / 3;
        const distance = Math.random() * 400;
        const x: any = (Math.random() * this.cvs.width || 0);
        const y: any = (Math.random() * 100 || 0);
        const init = new Crood(x, y);
        const final = new Crood(init.x + distance * Math.cos(angle), init.y + distance * Math.sin(angle));
        const size = Math.random() * 2;
        const speed = Math.random() * 400 + 100;
        const star = new ShootingStar(
            init, final, size, speed,
            () => {
                this.remove(star);
            }
        );
        return star;
    }

    public remove(star: any) {
        this.stars = this.stars.filter((s: any) => s !== star);
    }

    public update(delta: any) {
        if (!this.isStop && this.stars.length < 20) {
            this.stars.push(this.createStar());
        }
        this.stars.forEach((star: any) => {
            star.draw(this.ctx, delta);
        });
    }

    public tick() {
        if (this.playing) { return; }
        this.playing = true;

        const now = (new Date()).getTime();
        let last = now;
        let delta;

        const _tick = () => {
            if (this.isStop && this.stars.length === 0) {
                cancelAnimationFrame(this.T);
                this.playing = false;
                return;
            }

            delta = now - last;
            delta = delta > 500 ? 30 : (delta < 16 ? 16 : delta);
            last = now;
            // console.log(delta);

            this.T = requestAnimationFrame(_tick);

            this.ctx.save();
            this.ctx.globalCompositeOperation = 'destination-in';
            this.ctx.fillStyle = 'rgba(0,0,0,0.8)'; // 每一帧用 “半透明” 的背景色清除画布
            this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
            this.ctx.restore();
            this.update(delta);
        };
        _tick();
    }

    // 开始
    public start() {
        this.isStop = false;
        this.tick();
    }

    // 暂停
    public stop() {
        this.isStop = true;
    }
}

export default MeteorShower;