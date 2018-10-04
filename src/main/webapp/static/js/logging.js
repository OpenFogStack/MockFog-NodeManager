var refreshEnabled = true;

$(document).ready(handleAutoRefresh());

function handleRefreshChange () {
    var enabled = document.getElementById("cbrefresh").checked;
    console.log("Refesh is enabled: " + enabled);
    refreshEnabled = enabled;
}

function parseAnsibleLog(logdata) {
    var start = "<div> Init";
    var result =  logdata.replace("[?] Task","</div><div class=\"toptask\">[?] Task");
    result = result.replace("[?] task path","</div><div class=\"detailtask\" style=\"visibility: hidden\">[?] task path");
    var end = "</div>";
    return start + result + end;
}

function onClickShowMoreLogs() {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'process/logs',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            var logField= document.getElementById('log-field');
            logField.innerText = parseAnsibleLog(data['msg']);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function handleAutoRefresh() {
    if (refreshEnabled) {
        console.log("Getting logfile...");
        onClickShowMoreLogs();
    }
    setTimeout(handleAutoRefresh, 5000);
}