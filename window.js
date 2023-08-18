/* global $ */
const axios = require('axios')

// Run this function after the page has loaded
$(() => {
  let url
  const stocks = {
    'oil': 'CL.F', // Crude oil, https://metalpriceshub.com/api/v2/markets/?s=CL.F
    'gold': 'GC.F', // Gold, https://metalpriceshub.com/api/v2/markets/?s=GC.F
    'silver': 'SI.F' // Silver,https://metalpriceshub.com/api/v2/markets/?s=SI.F
  }

  for (let symbol in stocks) {
    url = `https://metalpriceshub.com/api/v2/markets?s=${stocks[symbol]}`
    axios.get(url).then(resp => {
      priceInfo = resp.data;
       
      const previousPrice = parseFloat(priceInfo['open'], 10)
      const highPrice = parseFloat(priceInfo['high'], 10)
      const lowPrice = parseFloat(priceInfo['low'], 10)
      const currentPrice = priceInfo['close']
      let change = Math.round((highPrice - lowPrice) * 100) / 100

      if (change >= 0) {
        change = `+${change}`
      }

      $(`#${symbol}-price`).html(currentPrice)
      $(`#${symbol}-change`).html(change)
    });
  }
})
