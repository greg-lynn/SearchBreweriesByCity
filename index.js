'use strict'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-error').empty();
  $('js-results').empty();

  for (let i = 0; i < responseJson.data.length; i++) {
    $('.results-list').append(`
    <ol><li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].name}</a></h3>
    <p><b>${responseJson.data[i].phone}</b></p>
    <p><b>Type:</b> ${responseJson.data[i].breweryType}</p>
    <p><b><a href="https://google.com/maps">${responseJson.data[i].street.city}</b></p>
    </li>
    </ol>`);
  }
  $('.results').removeClass('hidden');
}

function getBreweries(baseUrl, stateArray) {
  const params = {
    state: stateArray
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