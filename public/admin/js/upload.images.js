(function (WebUploader) {

    function UploadImages() {

        var _csrf = $('[name=_csrf]').val();

        var uploader = WebUploader.create({
            // swf文件路径
            swf: '/admin/js/Uploader.swf',
            // 文件接收服务端。
            server: '/admin/upload?_csrf=' + _csrf,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker',
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            fileSingleSizeLimit: 2 * 1024 * 1024,
            auto: true,
            resize: false,
            duplicate: true
        });
        uploader.on('fileQueued', function (file) {});

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            showProgress(file, percentage * 100);
        });

        uploader.on('uploadError', function (file) {
            $('.uploader .tip').html("错误").show();
        });

        uploader.on('uploadComplete', function (file) {
            hideProgress();
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function (file, res) {
            $("#show_img").attr('src', res.url);
            $("#img_url").val(res.url);
        });

        function showProgress(file, percentage) {
            $('.uploader .tip').html('正在上传: ' + file.name + ' ' + percentage + '%').show();
        }

        function hideProgress() {
            $('.uploader .tip').show();
        }
    }

    window.UploadImages = UploadImages;

})(window.WebUploader);