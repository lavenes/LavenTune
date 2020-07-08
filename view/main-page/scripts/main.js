const { ipcRenderer } = require('electron');

$( document ).ready(function() {

    $('#close-button').on('click', () => {
        ipcRenderer.send('close-button')
    });

    $('#on-off-button').on('click', () => {
        ipcRenderer.send('on-off-button')
    });

    ipcRenderer.on('changeStatus', (event, isOn) => {
        if(isOn) {
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


