'use strict'

class NavigatorDump {

    constructor() {

    }

    dumpValues() {

        console.log(`Language: ${navigator.language}`)
        console.log(`Languages: ${navigator.languages}`)
        console.log(`Cookies enabled: ${navigator.cookieEnabled}`)
        console.log(`Device memory: ${navigator.deviceMemory} gigabytes`)
        console.log(`Online: ${navigator.onLine}`)
        console.log(`User agent (browser): ${navigator.userAgent}`)
        console.log(`Vendor: ${navigator.vendor}`)
        console.log(`Platform: ${navigator.platform}`)

        let batteryIsCharging = false;

        navigator.getBattery().then((battery) => {
            batteryIsCharging = battery.charging;

            battery.addEventListener('chargingchange', () => {
                batteryIsCharging = battery.charging;
                console.log(`Battery charging: ${batteryIsCharging}`)
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
            console.log("Network status change", navigator.connection);
        })


        /*
                // This will trigger a allow/block dialog, to access the system clipboard.
                navigator.clipboard.readText().then(
                    (clipText) => console.log(clipText));
        */
    }


    positionSuccess(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    positionError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
}
var navigatorDump = new NavigatorDump()