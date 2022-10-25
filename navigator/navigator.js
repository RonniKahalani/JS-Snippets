'use strict'

class NavigatorDump {

    constructor() {

    }

    dumpValues() {

        let output = document.getElementById('output')

        output.innerHTML = ''
        output.innerHTML += `Language: ${navigator.language}<br>`
        output.innerHTML += `Languages: ${navigator.languages}<br>`
        output.innerHTML += `Cookies enabled: ${navigator.cookieEnabled}<br>`
        output.innerHTML += `Device memory: ${navigator.deviceMemory} gigabytes<br>`
        output.innerHTML += `Online: ${navigator.onLine}<br>`
        output.innerHTML += `User agent (browser): ${navigator.userAgent}<br>`
        output.innerHTML += `Vendor: ${navigator.vendor}<br>`
        output.innerHTML += `Platform: ${navigator.platform}<br>`

        let batteryIsCharging = false;

        navigator.getBattery().then((battery) => {
            batteryIsCharging = battery.charging;

            battery.addEventListener('chargingchange', () => {
                batteryIsCharging = battery.charging;
                output.innerHTML += `Battery charging: ${batteryIsCharging}<br>`
            });
        });

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this.positionSuccess, this.positionError, options)

        // To test this, try to disconnect your network connection and connect it again. This should trigger this the change.
        navigator.connection.addEventListener("change", (e) => {
            output.innerHTML += `Network status change ${navigator.connection}<br>`;
        })

        // This will trigger a allow/block dialog, to access the system clipboard.
        navigator.clipboard.readText().then(
            (clipText) => output.innerHTML += `Clipboard text: ${clipText}<br>`);

    }


    positionSuccess(pos) {
        const crd = pos.coords;
        let output = document.getElementById('output')

        output.innerHTML += 'Your current position is:<br>'
        output.innerHTML += `Latitude : ${crd.latitude}<br>`
        output.innerHTML += `Longitude: ${crd.longitude}<br>`
        output.innerHTML += `More or less ${crd.accuracy} meters.<br>`
    }

    positionError(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    }
}
var navigatorDump = new NavigatorDump()