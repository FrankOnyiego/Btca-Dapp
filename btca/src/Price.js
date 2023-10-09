import React, { Component } from 'react';
import axios from 'axios';

import './Price.css'; // Import the CSS file

class BitcoinPriceWidget extends Component {
  constructor() {
    super();
    this.state = {
      price: null,
      prevPrice: null, // Store the previous price
    };
  }

  componentDidMount() {
    // Call the API initially when the component mounts
    this.fetchBitcoinPrice();

    // Set up a timer to fetch the price every 5 seconds
    this.priceInterval = setInterval(this.fetchBitcoinPrice, 5000);
  }

  componentWillUnmount() {
    // Clear the timer when the component is unmounted to prevent memory leaks
    clearInterval(this.priceInterval);
  }

  fetchBitcoinPrice = () => {
    // Store the current price as the previous price before fetching the new price
    this.setState((prevState) => ({
      prevPrice: prevState.price,
    }));

    // Make an API request to get the Bitcoin price
    axios
      .get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
      .then((response) => {
        const { USD } = response.data;
        this.setState({ price: USD });
      })
      .catch((error) => {
        console.error('Error fetching Bitcoin price:', error);
      });
  };

  render() {
    const { price, prevPrice } = this.state;
    const arrowColor = price > prevPrice ? 'green' : price < prevPrice ? 'red' : 'black';

    return (
      <div className="bitcoin-price-widget">
        <h2>Bitcoin Price</h2>
        {price !== null ? (
          <p>
             1 BTC = 
            <span style={{ color: arrowColor }}>
              {price > prevPrice ? '▲' : price < prevPrice ? '▼' : ''}
            </span>
           ${price.toFixed(2)} USD
          </p>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    );
  }
}

export default BitcoinPriceWidget;
