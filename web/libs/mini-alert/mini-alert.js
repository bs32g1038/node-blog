;(function (window) {


    var miniAlert = function (options, fn) {

        var title = options.title || "消息";
        var text = options.text;
        var isShowCancelButton = options.showCancelBtn || false;
        var elTitle = null;
        var elText = null;
        var cancelBtn = null;
        var confirmBtn;
        var miniAlertContainer;
        var elContainer;

        var html = '<div class="mini-alert-modal">' +
            '<div class="top">' + 
                '<div class="right">' + 
                    '<div class="title" id="mini_alert_title"></div>' + 
                '</div>' + 
            '</div>' +
            '<div class="body">' + 
                '<div class="right">' + 
                    '<div class="ct" id="mini_alert_text"></div>' + 
                '</div>' + 
            '</div>' +
            '<div class="bottom">' + 
                '<div class="right">' + 
                    '<div class="mini-alert-btns">' +
                            '<input id="mini_alert_confirm" type="button" class="mini-alert-btn" value="确定">' +
                            '<input style="display:none" id="mini_alert_cancel" type="button" class="mini-alert-btn" value="取消">' +
                    '</div>' + 
                '</div>' + 
            '</div>';
        '</div>';

        var existingContainers = document.getElementsByClassName("mini-alert-container")

        if (existingContainers.length) {
            miniAlertContainer = existingContainers[0];
        } else {
            miniAlertContainer = document.createElement("div");
            miniAlertContainer.className = "mini-alert-container";
            miniAlertContainer.innerHTML += html;
            document.body.appendChild(miniAlertContainer);
        }

        confirmBtn = document.getElementById('mini_alert_confirm');
        elContainer = document.querySelector('.mini-alert-container');

        var setTitle = function (title) {
            elTitle = elTitle || document.getElementById('mini_alert_title');
            elTitle.innerHTML = title;
        }

        var setText = function (text) {
            elText = elText || document.getElementById('mini_alert_text');
            elText.innerHTML = text;
        }


        var hideAlert = function () {
            elContainer.style.display = "none";
        }
        var showAlert = function () {
            elContainer.style.display = "block";
        }


        var showCancelBtn = function (isShow) {
            cancelBtn = document.getElementById('mini_alert_cancel');
            if (isShow) {
                cancelBtn.style.display = 'inline-block';
                cancelBtn.onclick = hideAlert;
            } else {
                cancelBtn.style.display = 'none'
            }
        }

        showAlert();
        
        return (function () {
            setTitle(title);
            setText(text);
            showCancelBtn(isShowCancelButton)
            confirmBtn.onclick = function(){
                hideAlert();
                if(fn){
                    fn();
                } 
            };
        })();
    }

    window.miniAlert = miniAlert;

}(window));