/**
 * 音乐api类
 */
const musicList = require('../data/musicList.json');
const musicLyric = require('../data/musicLyric.json');

/**
 * 此处数据由./scripts/generateMusicJson.js生成
 * 原理通过获取网易云音乐的歌单，生成json文件
 * 为了解决网易云不支持https直链歌曲
 */
class MusicApi {

    // 获取网易云音乐歌单
    static async playlist(req, res, next) {
        res.json(musicList);
    }

    // 获取网易云歌曲歌词
    static async lyric(req, res, next) {
        const id = req.query.id || '';
        return res.json({ lyric: musicLyric[id] });
    }

}

module.exports = MusicApi;