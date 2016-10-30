$(document).ready(function () {

    var _csrf = $('#csrf').val();

    var resFn = function (res) {
        miniAlert({
            text: res.message,
        }, function () {
            if (res.success) {
                location.href = '/admin/link/list';
            }
        });
    };

    $('.link_del').on('click', function () {

        var id = $(this).data("id");
        var params = {
            _csrf: _csrf
        };

        miniAlert({
            text: "确定要删除该链接？",
            showCancelBtn: true
        }, function () {
            $.post('/admin/link/' + id + '/del', params, resFn);
        });

    });

    $('#add_link').on('click', function () {
        $('#link_modal_title').text('添加链接');
        $('#form').attr("action", '/admin/link/add');
        $('#name').val('');
        $('#url').val('');
    });
    $('.modify_link').on('click', function () {
        var link_id = $(this).data("id");
        var tds = $(this).parent().parent().find('td');
        $('#form').attr("action", '/admin/link/edit/' + link_id + '/do');
        $('#name').val(tds.eq(1).text())
        $('#url').val(tds.eq(2).text())
        $('#link_modal_title').text('编辑链接');
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
        });
        var params = {
            ids: ids,
            _csrf: _csrf
        };
        if (ids.length <= 0) {
            return miniAlert({text: "请在要删除的链接前面打勾"});
        }
        miniAlert({
            text: '确定要删除这些链接吗？',
            showCancelBtn: true
        }, function () {
            $.post('/admin/link/del', params, resFn);
        });
    });
});