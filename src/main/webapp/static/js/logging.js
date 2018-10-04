var refreshEnabled = true;

$(document).ready(handleAutoRefresh());

function handleRefreshChange () {
    var enabled = document.getElementById("cbrefresh").checked;
    console.log("Refesh is enabled: " + enabled);
    refreshEnabled = enabled;
}

function handleAutoRefresh() {
    if (refreshEnabled) {
        console.log("Getting logfile...");
        onClickShowMoreLogs();
    }
    setTimeout(handleAutoRefresh, 5000);
}