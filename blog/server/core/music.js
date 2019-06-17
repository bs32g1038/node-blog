const ReqRouter = require('./decorator-router');
const Axios = require('axios');
import { parseTime } from '../../src/utils/time';

@ReqRouter.ROUTER('/api/playlist')
class MusicApi {

    // 获取网易云音乐歌单
    @ReqRouter.GET('/detail')
    static async detail_list(req, res, next) {
        const id = req.query.id || '63531287'
        return Axios.get('http://music.163.com/api/playlist/detail?id=' + id).then((res) => {
            let result = res.data.result;
            let tracks = result.tracks;
            let arr = tracks.map((item) => {
                return {
                    src: `http://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                    name: item.name,
                    singer: item.artists[0].name,
                    album: item.album.name,
                    time: parseTime(item.duration, 'i:s')
                }
            })
            return {
                coverImgUrl: result.coverImgUrl,
                tracks: arr,
                name: result.name,
                createTime: parseTime(result.createTime, 'y-m-d'),
                description: result.description,
            };
        }).then((data) => {
            return res.json(data);
        })
    }

}