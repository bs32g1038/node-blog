import React, { Component } from 'react';
import Axios from 'axios';
// import { parseTime } from '../../utils/time';
// eg.
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
        this.audio = {};
        this.state = {
            curLyricItem: 0,
            songName: '基于react的音乐播放器',
            singer: 'LIZCBLOG',
            currentTime: 0,
            currentProgress: 0,
            playList: [],
            playIndex: -1,
            playMode: 1,
            isShowList: true,
            isShowLyric: true,
            lyric: null,
            info: {
                coverImgUrl: '/static/images/bg.jpg',
                name: 'LIZCBLOG博客音乐',
                createTime: '2017-1-30',
                description: '本播放器由react强力驱动，功能完整，欢迎来点歌噢',
            }
        };
    }

    /**
     * 格式化歌曲时间
     * @param {Number} time 
     */
    calcTime(time) {
        let hour, minute, second, timer = '';
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

    /**
     * 解析歌词
     * 歌词按时间分组并存储到数组
     * [{content: "车站 (Live) - 李健↵",time: 800}...]
     * @param lyric
     * @returns {*}
     */
    parseLyric(lrc) {
        let lyrics = lrc.split("\n");
        let lrcObj = {};
        for (let i = 0; i < lyrics.length; i++) {
            let lyric = decodeURIComponent(lyrics[i]);
            let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
            let timeRegExpArr = lyric.match(timeReg);
            if (!timeRegExpArr) continue;
            let clause = lyric.replace(timeReg, '');
            for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
                let t = timeRegExpArr[k];
                let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/:\d*/i)).slice(1));
                let time = min * 60 + sec;
                lrcObj[time] = clause;
            }
        }
        return lrcObj;
    }

    /**
     * 渲染歌词
     * @param {number} curTime 
     */
    renderLyric(curTime) {
        let data = this.state.lyric;
        for (let k in data) {
            if (k > curTime) {
                return this.setState({
                    curLyricItem: data[k].index - 1
                });
            } else if (k == Math.floor(curTime)) {
                return this.setState({
                    curLyricItem: data[k].index
                });
            }
        }
    }

    /**
     * 异步请求网络歌单
     * @param {string} id 
     */
    ajaxGetLyric(id) {
        return Axios.get('/api/music/lyric?id=' + id).then((res) => {
            if (!res.data.lyric) {
                return this.setState({
                    lyric: null
                });
            }
            let data = this.parseLyric(res.data.lyric);
            let lyric = {};
            let i = -1;
            for (let k in data) {
                lyric[k] = {
                    index: ++i,
                    content: data[k]
                };
            }
            this.setState({
                lyric
            });
        }).catch(err => { });
    }

    /**
     * audio时间更新事件
     */
    timeupdate() {
        let audio = this.audio;
        if (!isNaN(audio.duration)) {
            this.setState({
                currentTime: audio.currentTime,
                currentProgress: (audio.currentTime / audio.duration) * (300 - 12) + 'px'
            });
            this.renderLyric(audio.currentTime);
        }
    }

    /**
     * 播放歌曲
     */
    play(index) {
        const { playList } = this.state;
        const audio = this.audio;
        if (!audio.ended && audio.paused && audio.src) {
            return audio.play();
        }
        index = index || 0;
        const music = playList[index];
        audio.src = music.src;
        audio.play().catch(error => { }); // 捕抓多次点击错误
        this.setState({
            songName: music.name,
            singer: music.singer,
            playIndex: index,   // 设置歌曲索引
            curLyricItem: 0     // 重置歌词
        });
        this.ajaxGetLyric(music.id); // 获取歌词，并设置
    }

    /**
     * 暂停
     */
    pause() {
        this.audio.pause();
    }

    /**
     * 播放上一首
     */
    playPre() {
        this.state.playIndex > 0 && this.play(this.state.playIndex - 1);
    }

    /**
     * 播放下一首
     */
    playNext() {
        this.state.playIndex + 1 < this.state.playList.length
            &&
            this.play(this.state.playIndex + 1);
    }

    /**
     * 切换播放模式
     * @param {number} mode 
     */
    setMode(mode) {
        this.setState({
            playMode: mode
        });
    }

    /**
     * 根据播放模式播放歌曲
     */
    playMode(mode) {
        if (mode == 0) {
            this.playNext();
        } else {
            this.play(Math.ceil(Math.random() * this.state.playList.length - 1));
        }
    }

    /**
     * 控制播放列表显示
     */
    showPlayList() {
        const { isShowList } = this.state;
        this.setState({
            isShowList: !isShowList
        });
    }

    /**
     * 控制歌词显示
     */
    showLyric() {
        const { isShowLyric } = this.state;
        this.setState({
            isShowLyric: !isShowLyric
        });
    }

    /**
     * 实现进度拖动
     * 进度填充 progress-active
     * 进度指示按钮 progress-indicator
     * 功能：处理进度条点击和按钮移动更改audio的当前播放时间
     * @param {window.event} e 
     * @param {audio} audio 
     */
    _jsplayprogress(e, audio) {
        const self = this;
        let progressBar = e.currentTarget;
        let target = e.target || e.srcElement;
        switch (!!target && (target.getAttribute('id').toLowerCase())) {
            case 'js-progress': {
                // 进度点击
                let indicator = target.lastChild;
                let max = progressBar.offsetWidth;
                let thisX = (e || window.event).offsetX;
                let to = Math.min(max, thisX);
                if (audio.duration) {
                    indicator.style.left = to + 'px';
                    audio.currentTime = parseInt((to / max) * (audio.duration));
                }
                break;
            }
            case 'play-indicator': {
                // 拖动实现
                let indicator = target;
                let x = (e || window.event).clientX;
                let l = indicator.offsetLeft;
                let max = progressBar.offsetWidth - indicator.offsetWidth;
                document.onmousemove = function (e) {
                    let thisX = (e || window.event).clientX;
                    let to = Math.min(max, Math.max(-2, l + (thisX - x)));
                    if (audio.duration) {
                        indicator.style.left = to + 'px';
                        audio.currentTime = parseInt((to / max) * (audio.duration)); //重新设置播放进度
                    }
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                };
                break;
            }
            case 'play-progress-active': {
                // 激活进度点击
                let progressActive = target;
                let max = progressBar.offsetWidth;
                let thisX = (e || window.event).offsetX;
                let to = Math.min(max, thisX);
                if (audio.duration) {
                    progressActive.style.width = to + 'px';
                    audio.currentTime = parseInt((to / max) * (audio.duration)); //重新设置播放进度
                }
            }
        }
        self.renderLyric(audio.currentTime);
    }

    /**
     * 实现音量进度拖动
     * 进度填充 volume-line-active
     * 进度指示按钮 volume-indicator
     * 功能：处理进度条按钮移动更改audio的当前播放音量
     * @param {window.event} e 
     * @param {audio} audio 
     */
    _jsvolumeline(e, audio) {
        let volumeLine = e.currentTarget;
        let target = e.target || e.srcElement;
        if (!!target && (target.getAttribute('id').toLowerCase()) === 'volume-indicator') {
            // 拖动实现
            let indicator = target;
            let x = (e || window.event).clientX;
            let l = indicator.offsetLeft;
            let max = volumeLine.offsetWidth - indicator.offsetWidth;
            document.onmousemove = function (e) {
                let thisX = (e || window.event).clientX;
                let to = Math.min(max, Math.max(0, l + (thisX - x)));
                audio.volume = to / max; //重新播放音量
                indicator.style.left = to + 'px';
                indicator.previousSibling.style.width = to + indicator.offsetWidth + 'px';
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            };
            document.onmouseup = function () {
                document.onmousemove = null;
            };
        }
    }

    asyncData() {

    }

    // 将要挂载时加载网络数据
    // dom挂载完毕，为audio添加相应事件
    componentDidMount() {
        // 已存在播放器直接加载播放器中的数据
        let audio = document.getElementsByTagName('audio')[0];
        if (audio) {
            const musicState = sessionStorage.getItem('MusicState');
            if (musicState) {
                let o = JSON.parse(musicState);
                this.setState(o);
                this.audio = audio;
            }
        } else {
            Axios.get('/api/music/playlist?id=2161739123').then((res) => {
                this.setState({
                    playList: res.data.tracks,
                    info: {
                        coverImgUrl: res.data.coverImgUrl + '?param=200y200',
                        name: res.data.name,
                        createTime: res.data.createTime,
                        description: res.data.description,
                    }
                });
            });
            audio = document.createElement('audio');
            audio.volume = 1;
            document.body.appendChild(audio);
            this.audio = audio;
        }

        // 为audio绑定基础事件
        audio.ontimeupdate = () => this.timeupdate();
        audio.onended = () => this.playMode(this.state.playMode);

        // 绑定播放进度控制事件
        document.getElementById('js-progress').onmousedown = (e) => this._jsplayprogress(e, audio);

        // 绑定音量进度控制事件
        document.getElementById('js-volume').onmousedown = (e) => this._jsvolumeline(e, audio);
    }

    // 组件销毁时，把相关数据存到dom节点上
    componentWillUnmount() {
        sessionStorage.setItem('MusicState', JSON.stringify(this.state));
        document.getElementById('js-progress').onmousedown = null;
        document.getElementById('js-volume').onmousedown = null;
        this.audio.ontimeupdate = null;
        this.audio.onended = function () {
            const data = sessionStorage.getItem('MusicState');
            const state = JSON.parse(data);
            let index = 0;
            if (state.mode == 0) {
                index = state.playIndex + 1;
                (state.playIndex  + 1 > state.playList.length) && (index = 0);
            } else {
                index = Math.ceil(Math.random() * state.playList.length - 1);
            }
            const music = state.playList[index];
            this.src = music.src;
            this.play().catch(error => { }); // 捕抓多次点击错误
            state.playIndex = index;
            sessionStorage.setItem('MusicState', JSON.stringify(state));
        };
        this.audio = null;
    }

    render() {
        const info = this.state.info;
        let lyric = [];
        let data = this.state.lyric;
        for (let k in data) {
            lyric.push(
                <p
                    key={k}
                    className={data[k].index == this.state.curLyricItem ? "MusicLyric-item on" : "MusicLyric-item"}
                    data-time={k}>{data[k].content}</p>
            );
        }

        /**
         * 广告
         */
        lyric.push(<p className="MusicLyric-item" key="none-word">该歌曲暂无歌词</p>);
        lyric.push(<p className="MusicLyric-item" key="www.lizc.me">www.lizc.me</p>);
        return (
                <div className="MusicWrap">
                    <div className="MusicHeader">
                        <div className="MusicHeader-cover">
                            <img className="MusicHeader-coverImg" src={info.coverImgUrl} alt={info.name} />
                        </div>
                        <div className="MusicHeader-sheet">
                            <div className="MusicHeader-sheetTitle">{info.name}</div>
                            <div className="MusicHeader-sheetTime"><span>创建时间：</span>{info.createTime}</div>
                            <p className="MusicHeader-sheetSummary" title={info.description}>{info.description}</p>
                        </div>
                        <div className="MusicHeader-sheetSign">歌单</div>
                    </div>
                    {/* 歌词显示区域 */}
                    <div className="MusicLyric" style={{ height: this.state.isShowLyric ? '50px' : '0' }}>
                        <div className="MusicLyric-list" style={{ transform: `translateY(${-this.state.curLyricItem * 24}px)` }}>
                            {

                                /**
                                 * 歌词加载显示
                                 */
                                lyric
                            }
                        </div>
                    </div>
                    {/* 歌曲操作区域，包括播放，暂停，上一首，下一首，音量，进度... */}
                    <div className="MusicPlayArea">
                        <a title="上一曲" onClick={() => this.playPre()}><i className="fa fa-step-backward"></i></a>
                        {
                            !this.audio.paused ?
                                <a title="暂停" className="pause" onClick={() => this.pause()}><i className="fa fa-pause"></i></a>
                                :
                                <a title="播放" className="play" onClick={() => this.play()}><i className="fa fa-play"></i></a>
                        }
                        <a title="下一曲" onClick={() => this.playNext()}><i className="fa fa-step-forward"></i></a>
                        {
                            this.state.playMode == 0 ?
                                <a title="列表循环" style={{width: '30px'}} onClick={() => this.setMode(1)}><i className="fa fa-repeat"></i></a>
                                :
                                <a title="列表随机" style={{width: '30px'}} onClick={() => this.setMode(0)}><i className="fa fa-random"></i></a>
                        }
                        <div className="MusicPlayProgress">
                            <div className="MusicPlayProgress-playTime">{this.calcTime(this.state.currentTime || 0)}</div>
                            <div className="MusicPlayProgress-infoWrap">
                                <div className="musicInfo">{this.state.songName}/{this.state.singer}</div>
                                <div id="js-progress" className="MusicPlayProgress-Line">
                                    <span id="play-progress-active" className="MusicPlayProgress-Line active" style={{ width: this.state.currentProgress }}></span>
                                    <span id="play-indicator" className="MusicPlayProgress-indicator" style={{ left: this.state.currentProgress }}></span>
                                </div>
                            </div>
                            <div className="MusicPlayProgress-playTime">{this.calcTime(this.audio.duration || 0)}</div>
                        </div>
                        <div title="音量" className="MusicPlayVolume">
                            <i className="fa fa-volume-up volume"></i>
                            <div className="MusicPlayVolume-line" id="js-volume">
                                <span className="MusicPlayVolume-line active"></span>
                                <span id="volume-indicator" className="MusicPlayVolume-indicator"></span>
                            </div>
                        </div>
                        <a title="歌词" className="word"><span onClick={() => this.showLyric()}>词</span></a>
                        <a title="歌曲列表" onClick={() => this.showPlayList()}><i className="fa fa-bars"></i></a>
                    </div>
                    {

                        /**
                         * 播放列表显示，并且穷举音乐列表中的数据
                         */
                        <div className="MusicListTable">
                            <div className="MusicListTable-header">
                                <div className="MusicListTable-row">
                                    <div className="MusicListTable-cell index">索引</div>
                                    <div className="MusicListTable-cell name">歌曲名称</div>
                                    <div className="MusicListTable-cell singer">歌手</div>
                                    <div className="MusicListTable-cell duration">时长</div>
                                    <div className="MusicListTable-cell"></div>
                                </div>
                            </div>
                            <ul className="MusicListTable-body">
                                {
                                    this.state.playList.map((item, index) => (
                                        <li
                                            className="MusicListTable-row"
                                            key={index}
                                            onClick={() => this.play(index)}
                                        >
                                            <div className="MusicListTable-cell index">{index + 1}</div>
                                            <div className="MusicListTable-cell name">{item.name}</div>
                                            <div className="MusicListTable-cell singer">{item.singer}</div>
                                            <div className="MusicListTable-cell duration">{item.time}</div>
                                            <div className="MusicListTable-cell" style={{ position: 'relative' }}>
                                                {
                                                    (this.state.playIndex == index)
                                                    && !this.audio.paused &&
                                                    <div className="Music-songAnimate"><i></i><i></i><i></i></div>
                                                }
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </div>
        );
    }
}