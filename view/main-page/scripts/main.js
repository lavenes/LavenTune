const {
    ipcRenderer
} = require('electron');
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    message.innerText = 'A new update is available. Downloading now...';
    notification.classList.remove('hidden');
});
ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    restartButton.classList.remove('hidden');
    notification.classList.remove('hidden');
});

$(document).ready(function () {

    $('#close-button').on('click', () => {
        ipcRenderer.send('close-button')
    });

    $('#on-off-button').on('click', () => {
        ipcRenderer.send('on-off-button')
    });

    ipcRenderer.on('changeStatus', (event, isOn) => {
        if (isOn) {
            $('.toggle').each(() => {
                $(this).find('*').removeClass('red');
                $(this).find('*').addClass('green');
                $(".form-switch > input").prop('checked', true);
            });
            $('#status-off-on').html('CONNECTED');
        } else {
            $('.toggle').each(() => {
                $(this).find('*').removeClass('green');
                $(this).find('*').addClass('red');
                $(".form-switch > input").prop('checked', false);
            });
            $('#status-off-on').html('DISCONNECTED');
        }
    })

});

function closeNotification() {
    notification.classList.add('hidden');
}

function restartApp() {
    ipcRenderer.send('restart_app');
}