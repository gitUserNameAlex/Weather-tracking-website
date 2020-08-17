window.addEventListener('load', () => {
	let long; //longitude
	let lat; //latitude
	let tempDescription = document.querySelector('.temp-description');
	let tempDegree = document.querySelector('.temp-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temp');
	const temperatureSpan = document.querySelector('.temp span');

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			//DARK SKY API
			const myProxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${myProxy}https://api.darksky.net/forecast/5b223b07b34ee9d95f1ed5b336612ca5/${lat},${long}`;

			fetch(api)
			.then(responce => {
				return responce.json();
			})
			.then(data => {
				//Сейчас поменяем значения температуры и тд из html кода на реальные с помощью API
				//Set Elements from the API
				console.log(data);
				const { temperature, summary, icon } = data.currently;
				tempDegree.textContent = temperature;
				tempDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				
				//Трансформируем градусы по формуле
				//Formula to transform degrees
				let celsius  = (temperature - 32) * (5 / 9);

				//Устанавливаем иконку погоды
				//Set weather icon
				setIcons(icon, document.querySelector('.icon'));

				//меняем шкалу измерения с фаренгейта на цельсия
				//Change temperature from Celsius to Farenheit or backwards
				temperatureSection.addEventListener("click", () => {
					if (temperatureSpan.textContent === "°F") {
						temperatureSpan.textContent = "°C";
						tempDegree.textContent = Math.floor(celsius);
					} else {
						temperatureSpan.textContent = "°F";
						tempDegree.textContent = temperature;
					}
				});
			});
		});
	}

	const setIcons = function(icon, iconID) {
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});