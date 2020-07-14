
$(document).ready(function() {
    let socket = new WebSocket("wss://uy8ai0rs9l.execute-api.us-east-1.amazonaws.com/sandbox-bastion");
    let keepShowing = true;

    socket.onopen = function (e) {
        console.log("[open] Connection established - listening for PS events.");
    };

    socket.onmessage = function (event) {
        if (keepShowing) {
            data = JSON.parse(event.data);
            event = data.event;
            action = "Unknown";
            type = 'alert';
            if (event === 'PutParameter') {
                action = 'Updated';
                type = 'success';
            } else if (event === 'DeleteParameter') {
                action = 'Deleted';
                type = 'warning';
            }

            console.log(event);
            notification = GrowlNotification.notify({
                title: 'Figgy Sandbox Change Detected',
                description: `<b>Parameter:&nbsp;</b> ${data.parameter}<br/><b>Action:&nbsp;</b> ${action}<br/><b>Changed By:&nbsp;</b> ${data.user}`,
                showButtons: true,
                type: type,
                closeTimeout: 10000,
                showProgress: true,
                'animation.open': 'slide-in',
                'animation.close': 'slide-out',
                buttons: {
                    action: {
                        text: 'Hide notifications',
                        callback: function () {
                            keepShowing = false
                        }
                    }
                },
            });
            notification.show()
        }

    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log('[close] Connection died');
        }
    };

    socket.onerror = function (error) {
        console.log(`[error] ${error.message}`);
    };
});

