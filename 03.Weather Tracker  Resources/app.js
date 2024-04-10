window.addEventListener("load", solve)

function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/tasks';

    const historyButtonElement = document.getElementById('load-history');
    const weatherListElement = document.getElementById('list');
    const addButtonElement = document.getElementById('add-weather');
    const editButtonElement = document.getElementById('edit-weather');
    const [locationElement, temperatureElement, dateElement] = document.getElementsByTagName('input')

    let setId;

    const weatherLoad = async () => {
        const response = await fetch(baseUrl);
        const weatherData = await response.json();

        weatherListElement.innerHTML = '';

        Object.values(weatherData).forEach(weather => {


            const divContainer = document.createElement('div');
            divContainer.classList.add('container');

            const h2Element = document.createElement('h2');
            h2Element.textContent = weather.location;

            const h3DateElement = document.createElement('h3');
            h3DateElement.textContent = weather.date;

            const h3TempElement = document.createElement('h3');
            h3TempElement.textContent = weather.temperature;
            h3TempElement.setAttribute('id', 'celsius')

            const divButtonsElement = document.createElement('div');
            divButtonsElement.classList.add('buttons-container');

            const changeButton = document.createElement('button');
            changeButton.classList.add('change-btn');
            changeButton.textContent = 'Change'
            changeButton.addEventListener('click', () => {
                locationElement.value = weather.location;
                temperatureElement.value = weather.temperature;
                dateElement.value = weather.date;
                divContainer.remove();
                addButtonElement.disabled = true;
                editButtonElement.disabled = false;
                setId = weather._id;
            })

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Delete'
            deleteButton.addEventListener('click', async () => {
                await fetch(`${baseUrl}/${weather._id}`, {
                    method: 'DELETE'
                });

                divContainer.remove();
            })

            divButtonsElement.appendChild(changeButton);
            divButtonsElement.appendChild(deleteButton);
            divContainer.appendChild(h2Element);
            divContainer.appendChild(h3DateElement);
            divContainer.appendChild(h3TempElement);
            divContainer.appendChild(divButtonsElement);

            weatherListElement.appendChild(divContainer)


        })
    }
    addButtonElement.addEventListener('click', async () => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'aplication/json',
            },
            body: JSON.stringify({
                location: locationElement.value,
                temperature: temperatureElement.value,
                date: dateElement.value,
            })
        })
        if (!response.ok) {
            return;
        }
        clearInputData()
        weatherLoad()
    })
    editButtonElement.addEventListener('click', async () => {
        const response = await fetch(`${baseUrl}/${setId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'aplication/json',
            },
            body: JSON.stringify({
                location: locationElement.value,
                temperature: temperatureElement.value,
                date: dateElement.value,
                _id: setId,
            })
        })
        if (!response.ok) {
            return;
        }
        addButtonElement.disabled = false;
        editButtonElement.disabled = true;
        clearInputData()
        weatherLoad()
    })
    historyButtonElement.addEventListener('click', weatherLoad);

    function clearInputData() {
        locationElement.value = '';
        temperatureElement.value = '';
        dateElement.value = '';
    }
}