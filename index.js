'use strict'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-error').empty();
  $('.results-list').empty();

  for (let i = 0; i < responseJson.length; i++) {
    $('.results-list').append(`
    <li><h3><a href="${responseJson[i].website_url}">${responseJson[i].name}</a></h3>
    <p><b>Type:</b> ${responseJson[i].brewery_type}</p>
    <p><b><a href="${responseJson[i].phone}">${responseJson[i].phone}</a></b></p>
    <p><b>Address: <a href="#" onClick="window.open('https://www.google.com/maps/search/?api=1&query=${responseJson[i].latitude},${responseJson[i].longitude}')"></b> ${responseJson[i].street}, ${responseJson[i].city}</a></p>
    <a href="#" onClick="window.open('https://www.google.com/maps/search/?api=1&query=${responseJson[i].latitude},${responseJson[i].longitude}')"><img border="0" src= "https://open.mapquestapi.com/staticmap/v5/map?key=TUoC6xHGAdj2alufTnAXPlfaWukzre0d&center=${responseJson[i].latitude},${responseJson[i].longitude}&location=${responseJson[i].latitude},${responseJson[i].longitude};zoom=10&amp;size=400,200" alt="Brewery Search"></a></p>
    <br>
    </li>`);
  }
  $('.results').removeClass('hidden');
}

function getBreweries(baseUrl, stateArray) {
  const params = {
    by_state: stateArray
  }

  const queryString = formatQueryParams(params);
  const url = baseUrl + '?' + queryString;
  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('.js-error').text(`Something went wrong: ${err.message}`);
  });
}

function watchForm() {
  $('.js-form').on('submit', function() {
    event.preventDefault();
    const baseUrl = 'https://api.openbrewerydb.org/breweries'
    const stateArr = $('.js-state-entered').val();

    getBreweries(baseUrl, stateArr);
  })
}

$(watchForm);