import { Component } from 'inferno';
import Axios from 'axios';
import { parseTime } from '../utils/time';
// example
// {
//     src: "http://61.144.3.98:8084/SXC_F_1704463232_10792661911514900099/m10.music.126.net/20180318155508/3171b7ca93266b6e4ebda7714089e4d4/ymusic/0671/ca73/355c/2b832330d25a65cab30dbea4ebc4fd28.mp3",
//     name: "生生",
//     singer: "林俊杰",
//     album: "《新地球》",
//     time: "04:18"
// }
export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: {},
            musicCurrentTime: 0,
            indicator: 0,
            playList: [],
            playIndex: -1,
            playMode: 0,
            isShowList: true,
            volume: 1,
            timeupdateFn: null,
            endedFn: null,
            info: {
                coverImgUrl: '/static/images/bg.jpg',
                name: 'LIZCBLOG博客音乐',
                createTime: '2017-1-30',
                description: '本播放器由react强力驱动，功能完整，欢迎来点歌噢',
            }
        }
    }
    calcTime(time) {
        var hour, minute, second, timer = '';
        hour = String(parseInt(time / 3600, 10));
        minute = String(parseInt((time % 3600) / 60, 10));
        second = String(parseInt(time % 60, 10));
        if (hour != '0') {
            if (hour.length == 1) hour = '0' + hour;
            timer += (hour + ':');
        }
        if (minute.length == 1) minute = '0' + minute;
        timer += (minute + ':');
        if (second.length == 1) second = '0' + second;
        timer += second;
        return timer;
    }
    timeupdate() {
        var audio = this.state.audio;
        if (!isNaN(audio.duration)) {
            this.setState({
                musicCurrentTime: audio.currentTime
            })
        }
    }
    play(index) {
        const { audio, playList } = this.state;
        if (!audio.ended && audio.paused && audio.src) {
            return audio.play()
        }
        const music = playList[index || 0];
        audio.src = music.src;
        audio.play();
        audio.setAttribute('playIndex', index || 0);
        this.setState({
            playIndex: index || 0
        })
    }
    pause() {
        this.state.audio.pause();
    }
    playNext() {
        if (this.state.playIndex + 1 < this.state.playList.length) {
            this.play(this.state.playIndex + 1)
        }
    }
    playPre() {
        if (this.state.playIndex > 0) {
            this.play(this.state.playIndex - 1)
        }
    }
    playMode(mode) {
        if (mode == 0) {
            this.playNext()
        } else {
            this.play(Math.ceil(Math.random() * this.state.playList.length - 1))
        }
    }
    setMode(mode) {
        this.setState({
            playMode: mode
        })
    }
    showPlayList() {
        const { isShowList } = this.state;
        isShowList ? this.setState({
            isShowList: false
        }) : this.setState({
            isShowList: true
        })
    }
    indicatorProcessClick(e) {
        e = e || window.event;
        var left = e.currentTarget.getBoundingClientRect().left,
            width = e.currentTarget.offsetWidth;
        var progressX = Math.min(width, Math.abs(e.clientX - left)); //防止超出范围
        if (this.state.musicCurrentTime && this.state.audio.duration) {
            this.state.audio.currentTime = parseInt((progressX / width) * (this.state.audio.duration)); //重新设置播放进度
            this.state.audio.play();
        }
    }
    indicatorVolumeClick(e) {
        e = e || window.event;
        const left = e.currentTarget.getBoundingClientRect().left,
            width = e.currentTarget.offsetWidth;
        const progressX = Math.min(width, Math.abs(e.clientX - left)); //防止超出范围
        if (this.state.musicCurrentTime && this.state.audio.duration) {
            this.state.audio.volume = (progressX / width);
            this.setState({
                volume: this.state.audio.volume
            })
        }
    }
    // 尚未完成
    volumeIndicatorDown(event) {
        const dom = event.currentTarget;
        var w = dom.getBoundingClientRect().left;
        //获取距离父级相对位置
        console.log(w + "==========")
        let volume;
        const onmousemove = (e) => {
            e = e || window.event;
            let x = e.clientX;
            console.log(x)

            volume = (w - x) / w;
            return volume
        }
        const onmouseup = () => {
            console.log(volume)
            this.setState({
                volume
            })
            document.onmousemove = null;
            document.onmouseup = null;
        }
        document.onmouseup = (e) => onmouseup(e);
        document.onmousemove = (e) => onmousemove(e)
    }
    componentDidMount() {
        // 已存在播放器直接加载播放器中的数据
        let audio = document.getElementsByTagName('audio')[0];
        if (audio) {
            this.setState(Object.assign(JSON.parse(audio.getAttribute('state')), { audio }))
        } else {
            audio = document.body.appendChild(document.createElement('audio'))
            this.setState({ audio })
            this.state.audio.volume = 1;
            Axios.get('/api/playlist/detail?id=2161739123').then((res) => {
                this.setState({
                    timeupdateFn,
                    endedFn,
                    playList: res.data.tracks,
                    info: {
                        coverImgUrl: res.data.coverImgUrl,
                        name: res.data.name,
                        createTime: parseTime(res.data.createTime, 'y-m-d'),
                        description: res.data.description,
                    }
                })
            })
        }
        // 为audio捆绑事件
        const timeupdateFn = () => this.timeupdate()
        const endedFn = () => this.playMode(this.state.playMode)
        audio.ontimeupdate = timeupdateFn;
        audio.onended = endedFn;
    }
    componentWillUnmount() {
        this.state.audio.setAttribute('state', JSON.stringify(this.state));
    }
    render() {
        const info = this.state.info
        return (
            <div className="app-music">
                <div className="music-top-tip">基于react的音乐播放器</div>
                <div className="app-music-wrap">
                    <div className="app-music-header">
                        <div className="app-music-cover">
                            <img src={info.coverImgUrl + '?param=200y200'} alt={info.name} />
                        </div>
                        <div className="app-music-sheet">
                            <div className="sheet-title">{info.name}</div>
                            <div className="sheet-time"><span>创建时间：</span>{info.createTime}</div>
                            <p className="sheet-summary">{info.description}</p>
                        </div>
                        <div className="app-sheet-sign">
                            歌单
                        </div>
                    </div>
                    <div className="music-play-area">
                        <a title="上一曲" onClick={() => this.playPre()}><i className="fa fa-step-backward"></i></a>
                        {
                            !this.state.audio.paused ?
                                <a title="暂停" className="pause" onClick={() => this.pause()}><i className="fa fa-pause"></i></a>
                                :
                                <a title="播放" className="play" onClick={() => this.play()}><i className="fa fa-play"></i></a>
                        }
                        <a title="下一曲" onClick={() => this.playNext()}><i className="fa fa-step-forward"></i></a>
                        {
                            this.state.playMode == 0 ?
                                <a title="列表循环" onClick={() => this.setMode(1)}><i className="fa fa-repeat"></i></a>
                                :
                                <a title="列表随机" onClick={() => this.setMode(0)}><i className="fa fa-random"></i></a>
                        }
                        <div className="music-play-progress">
                            <div className="play-time">{this.calcTime(this.state.musicCurrentTime || 0)}</div>
                            <div className="play-progress-line" onClick={(e) => this.indicatorProcessClick(e)} >
                                <span className="play-progress-active"
                                    style={{ width: (this.state.musicCurrentTime / this.state.audio.duration) * 190 + 'px' }}
                                ></span>
                                <span
                                    className="play-indicator"
                                    style={{ left: (this.state.musicCurrentTime / this.state.audio.duration) * 190 + 'px' }}
                                ></span>
                            </div>
                            <div className="play-time">{this.calcTime(this.state.audio.duration || 0)}</div>
                        </div>
                        <div title="音量" className="music-play-volume">
                            <i className="fa fa-volume-up volume"></i>
                            <span className="volume-line"
                                onClick={(e) => this.indicatorVolumeClick(e)}
                            ></span>
                            <span className="volume-line-active"
                                style={{ width: this.state.volume * 100 + 'px' }}
                                onClick={(e) => this.indicatorVolumeClick(e)}
                            ></span>
                            <span className="volume-indicator"
                                // onMouseDown={(e) => this.volumeIndicatorDown(e)}
                                style={{ left: this.state.volume * 100 + 'px' }}
                            ></span>
                        </div>
                        <a title="歌词"><span className="word">词</span></a>
                        <a title="歌曲列表" onClick={() => this.showPlayList()}><i className="fa fa-bars"></i></a>
                    </div>
                    {
                        this.state.isShowList && <ul className="app-music-list">
                            <li className="app-music-item">
                                <div className="song-index">索引</div>
                                <div className="song-name">歌曲名称</div>
                                <div className="song-singer">歌手</div>
                                <div className="song-album">专辑</div>
                                <div className="song-duration">时长</div>
                            </li>
                            {
                                this.state.playList.map((item, index) => (
                                    <li
                                        className="app-music-item"
                                        key={index}
                                        onClick={() => this.play(index)}
                                    >
                                        <div className="song-index">{index + 1}</div>
                                        <div className="song-name">{item.name}</div>
                                        <div className="song-singer">{item.singer}</div>
                                        <div className="song-album">{item.album}</div>
                                        <div className="song-duration">{item.time}</div>
                                        {
                                            (this.state.playIndex == index)
                                            && !this.state.audio.paused &&
                                            <div className="song-animate"><i></i><i></i><i></i></div>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </div>
            </div>
        )
    }
}