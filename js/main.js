//declare variables and select elements
var ROOT_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
var API_KEY = "b735345cfcf12b8d2c21b5d941609621"
// select the elements cityTitle, zip, input bar, weather div, img with class icon,span wih class temp, span with class humid, select the  span with the class deg

var title = document.querySelector('.cityTitle')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var deg = document.querySelector('.deg')
var btn = document.querySelector('.convert')
var f

var icons = {
    "Clouds": "img/cloudy.png",
    "Thunderstorm": "img/thunderstorm.png",
    "Rain": "img/rain.png",
    "Snow": "img/snow.png",
    "Sunny": "img/sun.png",
    "Partly Cloudy": "img/partly-cloudy.png",
    "Hail": "img/hail.png",
    "Clear": "img/clear.png",
    "Sunshower" : "img/sunshower.png"
}



//define functions
function iconSelector(weather) {

    return icons[weather]
    //icons['clouds']
}


function kelvintoFarenheit(kelvin) {
    return Math.round((kelvin * 9 / 5) - 459.69)




}

function CtoF(Celcius) {
    return Math.round(Celcius * 9 / 5 + 32)
}

function FtoC(Far) {
    return Math.round((Far - 32) * (5 / 9))
}




function getWeather(zipCode) {

    $.ajax({
        type: "GET",
        url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            title.textContent = data.name
            weather.textContent = data.weather[0].main
            f = kelvintoFarenheit(data.main.temp)
            temp.textContent = f
            humid.textContent = data.main.humidity
            icon.src = iconSelector(data.weather[0].main)

        },

        error: function (error) {
            console.log("There was an error")
        }
    })


}





getWeather(33055)






// call functions and/or add event listeners

zip.addEventListener('keypress', function (e) {
    if (e.key == "Enter") {

        getWeather(zip.value)



    }


})
btn.addEventListener('click', function (e) {
    if (btn.textContent == "Convert to C") {
        temp.textContent = FtoC(temp.textContent)
        deg.innerHTML = "&deg; C"
        btn.textContent = "Convert to F"
    }
    else {
        temp.textContent = f
        deg.innerHTML = "&deg; F"
        btn.textContent = "Convert to C"
    }
})





