var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function (e) {

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=681e0ec432154233d6bbc62405872621`
    fetch(url)
        .then((res) => res.json())
        .then((data) =>
            L.popup()
                .setLatLng([e.latlng.lat, e.latlng.lng])
                .setContent(`
                    <div class="data">
                    <h4>Country : ${data.sys.country? data.sys.country:'Not an country'}</h4>
                    <h4>City : ${data.name ? data.name : 'No cities'}</h4>
                    <h4>Temp : ${data.main.temp? data.main.temp : 0}</h4>
                    <h4>Weather : ${data.weather[0].main ? data.weather[0].main : 'No weather'}</h4>
                    <h4>Wind Speed : ${data.wind.speed ? data.wind.speed : 0}</h4>
                    <h4>Wind (deg) : ${data.wind.deg ? data.wind.deg : 0}</h4>
                    </div>
                    `)
                .openOn(map)
        )
        .catch((e) => console.log(e))

        L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
});



