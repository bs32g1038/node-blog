const fs = require('fs');
const path = require('path');
const Axios = require('axios');
const { parseTime } = require('./time');

function randomUserAgent() {
    const userAgentList = [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)",
        "Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586",
        "Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1"
    ];
    const num = Math.floor(Math.random() * userAgentList.length);
    return userAgentList[num];
}

// 获取网易云音乐歌单
const playlist = async (id) => {
    return Axios.get('https://music.163.com/api/playlist/detail?id=' + id).then(async (res) => {
        let result = res.data.result;
        let tracks = result.tracks;
        let arr = tracks.map((item) => {
            return {
                id: item.id,
                src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                name: item.name,
                singer: item.artists[0].name,
                picUrl: item.album.picUrl,
                time: parseTime(item.duration, 'i:s')
            };
        });
        return {
            coverImgUrl: (result.coverImgUrl && result.coverImgUrl.replace('http:', '')) || '',
            tracks: arr,
            name: result.name,
            createTime: parseTime(result.createTime, 'y-m-d'),
            description: result.description,
        };
    });
};

// 获取网易云歌曲歌词
const getLyric = async (id) => {
    return Axios.post(`https://music.163.com/api/song/media?id=` + id, {
        Referer: "https://music.163.com",
        Cookie: "appver=1.5.2",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": randomUserAgent()
    }).then(_ => _.data.lyric);
};

(async () => {

    const sheet = await playlist(63531287);

    /**
     * 生成歌曲列表
     */
    fs.writeFileSync(path.resolve(__dirname, '../data/musicList.json'), JSON.stringify(sheet));

    /**
     * 根据歌曲id生成歌词，返回[{id: lyric}]
     */
    Promise.all(sheet.tracks.map((item, index) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const lyric = await getLyric(item.id);
                    console.log(`正在处理第${index}条数据的lyric，请耐心等候。。。`);
                    resolve({
                        [item.id]: lyric
                    });
                }
                catch (err) {
                    resolve();
                }
            }, 300 * Math.random() + 50);
        });
    })).then((arr) => {
        let lyric = {}; // 处理歌词，把数组转换为单个对象 eg:[{}] => {}
        arr.map((item) => {
            Object.assign(lyric, item);
        });
        fs.writeFileSync(path.resolve(__dirname, '../data/musicLyric.json'), JSON.stringify(lyric));
    });

})();
