$(document).ready(function () {

    var _csrf = $('#csrf').val();

    var resFn = function (res) {
        miniAlert({
            text: res.message,
        }, function () {
            if (res.success) {
                location.href = '/admin/guestbook/list';
            }
        });
    };

    $('.guestbook_del').on('click', function () {

        var id = $(this).data("id");
        var params = {
            _csrf: _csrf
        };

        miniAlert({
            text: "确定要删除该留言？",
            showCancelBtn: true
        }, function () {
            $.post('/admin/guestbook/' + id + '/del', params, resFn);
        });

    });
    $('.btn-pass').on('click', function () {
        var id = $(this).data("id");
        var params = {
            _csrf: _csrf
        };

        miniAlert({
            text: "确定要通过该留言吗？",
            showCancelBtn: true
        }, function () {
            $.post('/admin/guestbook/' + id + '/pass/do', params, resFn);
        });

    });
    $('#selectAll').on('click', function () {
        $("input[name='listItem']").prop("checked", $(this).prop("checked"));
    });
    $("input[name='listItem']").on('click', function () {
        $('#selectAll').prop("checked", false)
    });
    $('#btnListDel').on('click', function () {

        var ids = [];

        $("input[name='listItem']").each(function () {
            if (true == $(this).prop("checked")) {
                ids.push($(this).prop('value'));
            }
        })

        var params = {
            ids: ids,
            _csrf: _csrf
        };

        if (ids.length <= 0) {
            return miniAlert({text: "请在要删除的留言前面打勾"});
        }
        miniAlert({
            text: "确定要删除这些留言？",
            showCancelBtn: true
        }, function () {
            $.post('/admin/guestbook/del', params, resFn);
        });

    });
});