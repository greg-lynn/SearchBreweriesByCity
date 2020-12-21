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

  for (let i = 0; i < responseJson.length; i++) {
    $('.results-list').append(`
    <li><h3><a href="${responseJson[i].website_url}">${responseJson[i].name}</a></h3>
    <p><b>${responseJson[i].phone}</b></p>
    <p><b>Type:</b> ${responseJson[i].brewery_type}</p>
    <p><b>City:</b> ${responseJson[i].city}</p>
    <p><b>[embedded map goes here]</b></p>
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