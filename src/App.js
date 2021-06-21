import React, {useState,useEffect} from 'react';
import Coin from './Coin';
import './App.css';

import axios from 'axios';

function App() {

        const [coins, setCoins] = useState([]);
        const [search, setSerach] = useState('');
        // const [update, setUpdate] = useState(0);

    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res=>setCoins(res.data))
      .catch(error=>console.log(error))

    }, [])

    // setInterval(() => {
    //   setUpdate(update+1);
    // }, 1000);

    // const fillterCoins=coins.filter((coin)=>{
    //   coin.name.toLowerCase().includes(search.toLowerCase())
    // });

    const fillterCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="coin-app">
      <div className="coin-search">
        
        <div className="coin-text">
        <p id="heading">Crypto Currency Price Tracker</p><br/>
        Serach a currency
        </div>
          <form>
            <input type="text" placeholder="Search" className="coin-input" onChange={(event)=>setSerach(event.target.value)}></input>
          </form>
      </div>

      {fillterCoins.map((coin)=>{
        
        return(
          <Coin key={coin.id}
           name={coin.name}
           image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })}

    </div>
  );
}

export default App;
