import React from 'react';
import MusicJson from './musicList.json';
import musicLyric from './musicLyric.json';
// import Axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.audio = {};
        this.state = {
            curLyricItem: 0,
            songName: '----',
            singer: '--',
            currentTime: 0,
            currentProgress: 0,
            playIndex: -1,
            playMode: 1,
            isShowList: true,
            playList: MusicJson.tracks,
            info: MusicJson,
            lyric: '',
            isShowLyric: false,
            isPaused: true,
            picUrl: '',
            isShowAboutDialog: false,
            randomList: {}, // {1: true, 2: false}模拟真随机
            ctrlClickTime: null // 用于控制只执行最后一次点击播放事件
        };
    }

    /**
     * 显示关于对话框窗口
     */
    showAboutDialog() {
        this.setState({
            isShowAboutDialog: !this.state.isShowAboutDialog
        })
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
        // return Axios.get('/api/music/lyric?id=' + id).then((res) => {
        //     if (!res.data.lyric) {
        //         return this.setState({
        //             lyric: null
        //         });
        //     }
        let data = this.parseLyric(musicLyric[id]);
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
        // }).catch(err => { });
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
        clearTimeout(this.state.ctrlClickTime)
        const ctrlClickTime = setTimeout(() => {
            const { playList } = this.state;
            const audio = this.audio;
            if (!audio.ended && audio.paused && audio.src) {
                this.setState({
                    isPaused: false
                })
                audio.load();
                return audio.play().catch(error => { console.log(error) });
            }
            index = index || 0;
            const music = playList[index];
            audio.src = music.src;
            audio.load();
            audio.play().catch(error => { console.log(error) }); // 捕抓多次点击错误
            document.body.style.backgroundImage = `url(${music.picUrl})`;
            this.setState({
                songName: music.name,
                picUrl: music.picUrl,
                singer: music.singer,
                playIndex: index,   // 设置歌曲索引
                curLyricItem: 0,    // 重置歌词
                isPaused: false
            });
            this.ajaxGetLyric(music.id); // 获取歌词，并设置
        }, 200);
        this.setState({
            ctrlClickTime: ctrlClickTime
        });
    }

    /**
     * 暂停
     */
    pause() {
        this.audio.pause();
        this.setState({
            isPaused: true
        })
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
        if (mode === 0) {
            this.playNext();
        } else {
            let randomList = {};
            if (Object.keys(this.state.randomList).length <= 0) {
                for (let i = 0; i < this.state.playList.length; i++) {
                    randomList[i] = 0;
                }
            } else {
                randomList = this.state.randomList;
            }
            const arr = Object.keys(randomList);
            const num = Math.ceil(Math.random() * arr.length - 1);
            const index = arr[num];
            delete randomList[index];
            this.setState({
                randomList
            });
            return this.play(index);
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
        switch (!!target && (target.getAttribute('id') && target.getAttribute('id').toLowerCase())) {
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
                break;
            }
            default:
                break;
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
        if (!!target && (target.getAttribute('id') && target.getAttribute('id').toLowerCase()) === 'volume-indicator') {
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
            // Axios.get('/api/music/playlist?id=2161739123').then((res) => {
            //     this.setState({
            //         playList: res.data.tracks,
            //         info: {
            //             coverImgUrl: res.data.coverImgUrl + '?param=200y200',
            //             name: res.data.name,
            //             createTime: res.data.createTime,
            //             description: res.data.description,
            //         }
            //     });
            // });
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

        // 默认播放器第一首歌
        this.play(0);
        this.pause();
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
                (state.playIndex + 1 > state.playList.length) && (index = 0);
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
                    data-time={k}>{data[k].content}
                </p>
            );
        }

        /**
         * 广告
         */
        lyric.push(<p className="MusicLyric-item" key="none-word">该歌曲暂无歌词</p>);
        lyric.push(<p className="MusicLyric-item" key="www.lizc.me">www.lizc.me</p>);
        return (
            <div className="music-wrap">
                <div className="bg-mask"></div>
                <div className="bg-music-player" style={{ backgroundImage: `url(${this.state.picUrl})` }} id="backImg"></div>
                <div className="about-dialog" style={{ display: this.state.isShowAboutDialog ? 'block' : 'none' }}>
                    <div className="about-dialog-title">关于</div>
                    <div className="about-dialog-content">
                        <p>版权所有Copyright © 2016-2019 (@lee)</p>
                        <p>博客：<a href="http://www.lizc.me" target="_blank">http://www.lizc.me</a></p>
                        <p>版本：1.0.0</p>
                        <p>如果你觉得本项目对你有帮助，可以请作者喝杯咖啡(*^_^*)哦</p>
                        <p>
                            打赏作者：
                            <img src={require('./assets/pay-qrcode.jpg')} alt="打赏作者" />
                        </p>
                    </div>
                    <div className="about-dialog-footer">
                        <button type="button" onClick={() => this.showAboutDialog()}>关闭</button>
                    </div>
                </div>
                <header className="header">
                    <h1 className="site-logo">
                        <a href="http://www.lizc.me" rel="noopener noreferrer" target="_blank">MM音乐</a>
                    </h1>
                    <div className="header-help">
                        <a href="javascript:;" onClick={() => this.showAboutDialog()}>关于</a>
                    </div>
                </header>
                <div className="MusicCore">
                    <div className="MusicCore-body" style={{ display: this.state.isShowLyric && 'none' || '' }}>
                        <div className="MusicHeader">
                            <div className="MusicHeader-cover">
                                <img className="MusicHeader-coverImg" src={info.coverImgUrl} alt={info.name} />
                            </div>
                            <div className="MusicHeader-sheet">
                                <div className="MusicHeader-sheetTitle">{info.name}</div>
                                <div className="MusicHeader-sheetTime"><span>创建时间：</span>{info.createTime}</div>
                                <p className="MusicHeader-sheetSummary" title={info.description}>{info.description}</p>
                            </div>
                        </div>
                        <div className="MusicListTable">
                            <div className="MusicListTable-header">
                                <div className="MusicListTable-row">
                                    <div className="MusicListTable-cell index">序号</div>
                                    <div className="MusicListTable-cell name">歌曲</div>
                                    <div className="MusicListTable-cell singer">歌手</div>
                                    <div className="MusicListTable-cell duration">时长</div>
                                    <div className="MusicListTable-cell"></div>
                                </div>
                            </div>
                            <ul className="MusicListTable-body">
                                {
                                    this.state.playList.map((item, index) => (
                                        [<li
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
                                        </li>,
                                        <li className="MusicListTable-row" key={'line' + index}>
                                            <i className="list-line"></i>
                                            <i className="list-line"></i>
                                            <i className="list-line"></i>
                                            <i className="list-line"></i>
                                            <i className="list-line"></i>
                                            <i className="list-line"></i>
                                        </li>
                                        ]
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="song-play-area" style={{ display: !this.state.isShowLyric && 'none' || '' }}>
                        <div className="pic-circle">
                            <img src={this.state.picUrl} alt="" />
                        </div>
                        <div className="MusicLyric">
                            <div className="MusicLyric-list" style={{ transform: `translateY(${-this.state.curLyricItem * 24}px)` }}>
                                {

                                    /**
                                     * 歌词加载显示
                                     */
                                    lyric
                                }
                            </div>
                        </div>
                    </div>
                    <div className="MusicCore-footer">
                        <div className="MusicPlayArea">
                            <a title="上一曲" className="prev" onClick={() => this.playPre()}>
                                <svg className="icon-prev" viewBox="0 0 1024 1024">
                                    <path d="M111.081001 996.674695l27.147868 0c22.853891 0 41.591243-18.737352 41.591243-41.591243l0-363.391064c5.89091 5.110187 11.63987 10.220374 18.772839 14.869224l609.53173 393.555361c80.556418 51.953566 146.38556 16.217746 146.38556-79.70472l0-816.884658c0-95.816003-65.829143-131.658286-146.38556-79.669232l-609.53173 393.697311c-7.132969 4.613363-12.881929 9.794525-18.772839 14.904712L179.820112 68.82091c0-22.853891-18.737352-41.591243-41.591243-41.591243l-27.147868 0c-22.853891 0-41.591243 18.701864-41.591243 41.591243l0 886.227055C69.489759 977.937344 88.191623 996.674695 111.081001 996.674695z" />
                                </svg>
                            </a>
                            {
                                this.state.isPaused ?
                                    <a title="播放" className="pause" onClick={() => this.play()}>
                                        <svg className="icon-play" viewBox="0 0 1024 1024">
                                            <path d="M893.035 463.821679C839.00765 429.699141 210.584253 28.759328 179.305261 8.854514 139.495634-16.737389 99.686007 17.385148 99.686007 57.194775v909.934329c0 45.496716 42.653172 68.245075 76.775709 48.340262 45.496716-28.435448 676.763657-429.375262 716.573284-454.967165 34.122537-22.748358 34.122537-76.775709 0-96.680522z" />
                                        </svg>
                                    </a>
                                    :
                                    <a title="暂停" className="play" onClick={() => this.pause()}>
                                        <svg className="icon-play" viewBox="0 0 1024 1024">
                                            <path d="M445.2 145.3v733.4c0 9-3.3 16.9-9.9 23.4-6.6 6.6-14.5 9.9-23.4 9.9H145.3c-9 0-16.9-3.3-23.4-9.9s-9.9-14.5-9.9-23.4V145.3c0-9 3.3-16.9 9.9-23.4 6.6-6.6 14.4-9.9 23.4-9.9h266.6c9 0 16.9 3.3 23.4 9.9 6.6 6.5 9.9 14.4 9.9 23.4z m466.8 0v733.4c0 9-3.3 16.9-9.9 23.4-6.6 6.6-14.5 9.9-23.4 9.9H612c-9 0-16.9-3.3-23.4-9.9-6.6-6.6-9.9-14.5-9.9-23.4V145.3c0-9 3.3-16.9 9.9-23.4 6.6-6.6 14.5-9.9 23.4-9.9h266.6c9 0 16.9 3.3 23.4 9.9 6.6 6.5 10 14.4 10 23.4z" />
                                        </svg>
                                    </a>
                            }
                            <a title="下一曲" className="next" href="javascript:;" onClick={() => this.playNext()}>
                                <svg className="icon-next" viewBox="0 0 1024 1024"><path d="M912.920002 27.333633l-27.147936 0c-22.853949 0-41.591347 18.701911-41.591347 41.591347l0 363.391975c-5.890925-5.1102-11.639899-10.184912-18.772886-14.869262l-609.533257-393.591834c-80.556619-51.953697-146.385927-16.217786-146.385927 79.704919l0 816.886705c0 95.816243 65.829307 131.658616 146.385927 79.669432l609.533257-393.698297c7.132987-4.613375 12.881962-9.794549 18.772886-14.869262l0 363.569412c0 22.853949 18.737399 41.591347 41.591347 41.591347l27.147936 0c22.853949 0 41.591347-18.737399 41.591347-41.591347L954.51135 68.889493C954.51135 46.035544 935.773951 27.333633 912.920002 27.333633z" /></svg>
                            </a>
                            <div className="info-content">
                                <div className="music-pic">
                                    <img src={this.state.picUrl} alt="" onClick={() => this.showLyric()} />
                                </div>
                                <div className="MusicPlayProgress">
                                    <div className="_base-info">
                                        <div className="musicInfo">{this.state.songName}/{this.state.singer}</div>
                                        <div className="MusicPlayProgress-playTime"><span>{this.calcTime(this.state.currentTime || 0)}</span>/<span>{this.calcTime(this.audio.duration || 0)}</span></div>
                                    </div>
                                    <div id="js-progress" className="MusicPlayProgress-Line">
                                        <span id="play-progress-active" className="MusicPlayProgress-Line active" style={{ width: this.state.currentProgress }}></span>
                                        <span id="play-indicator" className="MusicPlayProgress-indicator" style={{ left: this.state.currentProgress }}></span>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.playMode === 0 ?
                                    <a title="列表循环" className="recycle" onClick={() => this.setMode(1)}>
                                        <svg className="icon-recycle" viewBox="0 0 1024 1024">
                                            <path d="M552.96 268.6976h61.44v40.96h-61.44zM655.36 268.6976v40.96a245.76 245.76 0 0 1 0 491.52H368.64a245.76 245.76 0 0 1 0-491.52h122.88v-40.96h-122.88a286.72 286.72 0 0 0 0 573.44h286.72a286.72 286.72 0 0 0 0-573.44zM474.9312 303.7184l-86.8352-86.8352a20.48 20.48 0 1 1 28.8768-28.8768l86.8352 86.8352a20.48 20.48 0 0 1-28.8768 28.8768zM409.6 412.0576h286.72a20.48 20.48 0 0 1 0 40.96H409.6a20.48 20.48 0 0 1 0-40.96zM409.6 555.4176h286.72a20.48 20.48 0 0 1 0 40.96H409.6a20.48 20.48 0 0 1 0-40.96zM409.6 678.2976h286.72a20.48 20.48 0 1 1 0 40.96H409.6a20.48 20.48 0 0 1 0-40.96zM327.68 412.0576a20.48 20.48 0 1 1-20.48 20.48 20.48 20.48 0 0 1 20.48-20.48zM327.68 555.4176a20.48 20.48 0 1 1-20.48 20.48 20.48 20.48 0 0 1 20.48-20.48zM327.68 678.2976a20.48 20.48 0 1 1-20.48 20.48 20.48 20.48 0 0 1 20.48-20.48z" />
                                        </svg>
                                    </a>
                                    :
                                    <a title="列表随机" className="recycle" onClick={() => this.setMode(0)}>
                                        <svg className="icon-recycle" viewBox="0 0 1024 1024">
                                            <path d="M747.52 309.4528a245.76 245.76 0 0 0-245.76 245.76v14.7456c-15.7696 38.912-17.408 56.7296-29.2864 68.1984a286.72 286.72 0 0 1-257.4336 162.816h-20.48v-40.96h20.48a245.76 245.76 0 0 0 239.2064-190.2592c2.4576-3.6864 4.5056-7.5776 6.7584-11.264s0-2.048 0-3.2768a286.72 286.72 0 0 1 286.72-286.72h61.44v40.96zM794.4192 721.5104l-87.04 86.2208a20.48 20.48 0 0 0 0 28.672 20.48 20.48 0 0 0 29.0816 0l87.04-86.2208a20.48 20.48 0 0 0 0-28.672 20.48 20.48 0 0 0-29.0816 0zM792.576 303.5136l-86.8352-86.8352a20.48 20.48 0 1 1 28.8768-28.8768l86.8352 86.8352a20.48 20.48 0 0 1-28.8768 28.8768zM749.1584 715.5712A245.76 245.76 0 0 1 502.784 471.04v-14.7456c-15.7696-38.5024-17.6128-56.32-29.2864-67.7888a286.72 286.72 0 0 0-197.632-155.0336v40.96a245.76 245.76 0 0 1 178.7904 181.248c2.4576 3.6864 4.5056 7.5776 6.7584 11.264s0 2.048 0 3.072a286.72 286.72 0 0 0 286.72 284.672h61.44v-40.96zM235.52 228.352h-40.96v40.96h40.96z" />
                                        </svg>
                                    </a>
                            }
                            <a title="下载" className="down">
                                <svg className="icon-down" viewBox="0 0 1024 1024">
                                    <path d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z" />
                                </svg>
                            </a>
                            <div title="音量" className="MusicPlayVolume">
                                <svg className="icon-volumn" viewBox="0 0 1024 1024">
                                    <path d="M812.343523 375.615721v-268.296944c0-11.924309-10.43377-22.358079-22.358079-22.358078s-22.358079 10.43377-22.358079 22.358078v693.100437c0 11.924309 10.43377 22.358079 22.358079 22.358079s22.358079-10.43377 22.358079-22.358079V533.612809c43.225619 0 78.998544-35.772926 78.998544-78.998544s-35.772926-78.998544-78.998544-78.998544zM326.427948 308.541485h-55.149928v286.183406h55.149928s22.358079-4.471616 59.621543-2.981077c92.413392 1.490539 268.296943 32.791849 369.653566 228.052401V83.47016c-143.091703 272.768559-429.275109 225.071325-429.275109 225.071325z" /><path fill="#707070" d="M389.030568 608.139738c-35.772926 0-59.621543 2.981077-59.621543 2.981077h-55.149927v-2.981077c-2.981077 2.981077-5.962154 4.471616-5.962155 4.471616h5.962155s59.621543 256.372635 98.375545 260.84425c38.754003 5.962154 55.149927-19.377001 43.225619-53.659389-8.943231-25.339156-22.358079-152.034934-26.829694-211.656477zM120.733624 451.633188c0 78.998544 64.093159 143.091703 143.091704 143.091703h1.490538l-1.490538-284.692868c-78.998544-1.490539-143.091703 62.60262-143.091704 141.601165z" />
                                </svg>
                                <div className="MusicPlayVolume-line" id="js-volume">
                                    <span className="MusicPlayVolume-line active"></span>
                                    <span id="volume-indicator" className="MusicPlayVolume-indicator"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}