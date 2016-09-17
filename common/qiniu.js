var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access Key';
qiniu.conf.SECRET_KEY = 'Secret Key';

//要上传的空间
bucket = 'bucket';

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    putPolicy.callbackUrl = 'http://o7ctl0sy3.bkt.clouddn.com/callback';
    putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
    return putPolicy.token();
}

//构造上传函数
function uploadFile(uptoken, key, localFile, callback) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
        if (!err) {
            callback(null, ret.hash, ret.key, ret.persistentId);
        } else {
            callback(err);
        }
    });
}

exports.upload = function (file_path, key, callback) {

    uploadFile(uptoken(bucket, key), key, file_path, callback);

}

//uploadFile(token, null, 'C:/Users/Administrator/Desktop/1.txt');


//注意
//上传策略不指定key的同时，上传函数函数也不指定key，才会用文件的hash进行命名