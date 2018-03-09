(function ($) {
    $(document).ready(function () {

        new TagInput({
            el: '#tag',
            container: '#tag-container',
            input: '#tag-input',
            limit: 3, //限制输入标签个数,
        })

        function TagInput(options) {

            var $el = $(options.el);
            var $container = $(options.container);
            var $input = $(options.input);
            var limit = $(options.limit);

            var getTagHtml = function (tag) {
                return '<div class="tag-tx">' + tag + '<a onclick="return false" href="javascript:;" title="删除">×</a></div>';
            }

            var el_value = $el.val();

            if (el_value != '') {
                $.each(el_value.split(','), function (n, tag) {
                    return $input.before(getTagHtml(tag));
                });
            }

            //初始化事件
            $input.keydown(function (event) {

                var input_value = $input.val();
                var el_value = $el.val();
                var len = $container.children().length;

                if (event.keyCode == 32) { //13等于回车键(Enter)键值
                    if ((el_value.indexOf($.trim(input_value)) != -1) || (len > limit)) {
                        $(this).val("");
                        return false;
                    }
                    console.log("cc")
                    $input.before(getTagHtml($(this).val()));
                    if (el_value) {
                        $el.val(el_value + ',' + $.trim(input_value));
                    } else {
                        $el.val($.trim(input_value));
                    }
                    $input.val("");
                    return false;
                }
                if (event.keyCode == 8 && tag_input_value.length <= 0) { //8等于后退键(BackSpace)键值
                    var p = tag_value.lastIndexOf(',')
                    el_tag_input.val(tag_value.substring(0, p))
                    $(this).prev().remove();
                }
            });
            $container.on('click', '.tag_tx a', function (event) {
                var p = $el.val().lastIndexOf(',')
                el_tag_input.val(tag_value.substring(0, p))
                $(this).parent().remove();
            });
            $container.click(function () {
                $input.focus();
            });
        }
    });
})(jQuery);