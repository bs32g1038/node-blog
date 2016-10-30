$(document).ready(function() {

    var _csrf = $('#csrf').val();

    var resFn = function(res) {
        miniAlert({
            text: res.message,
        }, function() {
            if (res.success) {
                location.href = '/admin/doc/list';
            }
        });
    };
    $('.doc_del').on('click', function() {

        var id = $(this).data("id");
        var params = {
            _csrf: _csrf
        };

        miniAlert({
            text: "确定要删除该文章？",
            showCancelBtn: true
        }, function() {
            $.post('/admin/doc/' + id + '/del', params, resFn);
        });
    });
    $('.is_recommend').on('click', function() {

        var id = $(this).data("id");
        var value = $(this).data("value");
        var params = {
            _csrf: _csrf,
            is_recommend: value
        };

        $.post('/admin/doc/' + id + '/recommend/do', params, resFn);

    });
    $('#selectAll').on('click', function() {
        $("input[name='listItem']").prop("checked", $(this).prop("checked"));
    });
    $("input[name='listItem']").on('click', function() {
        $('#selectAll').prop("checked", false)
    });
    $('#btnListDel').on('click', function() {
        var ids = [];
        $("input[name='listItem']").each(function() {
            if (true == $(this).prop("checked")) {
                ids.push($(this).prop('value'));
            }
        })
        var params = {
            ids: ids,
            _csrf: _csrf
        };
        if (ids.length <= 0) {
            return miniAlert({ text: "请在要删除的文章前面打勾"});
        }
        miniAlert({
            text: "确定要删除这些文章？",
            showCancelBtn: true
        }, function() {
            $.post('/admin/doc/del', params, resFn);
        });
    });
});