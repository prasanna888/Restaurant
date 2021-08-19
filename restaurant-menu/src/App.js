import axios from 'axios';
import { useRef, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import RestaurantInfo from './Components/restaurant-list/restaurant-info';
import RestaurantDetails from './Components/restaurant-list/restaurant-details/restaurant-details';
import './App.css';
const authUrl = '508ab21d1d779c46f1ac0e70d12df02e';
axios.interceptors.request.use(
  config => {
    config.headers['X-API-KEY'] = authUrl;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function App() {
  const [searchValue, updateSearchValue] = useState('');
  const resInfoRef = useRef(null);
  const location = useLocation();

  return (
    <div className="App">
            
      <header className="App-header">
                
        <div id="inputWrapper">
                    <h1>Restaurant</h1>          
          {location?.pathname !== '/' ? null : (
            <>
                              
              <input
                value={searchValue}
                onChange={e => updateSearchValue(e.target.value)}
                className="search-box"
                id="input"
                type="search"
                autoComplete="off"
                placeholder="Search by Restaurant Name"
              />
                              
              <button
                onClick={() => resInfoRef?.current?.searchData(searchValue)}
                className="search-button"
              >
                Search 
              </button>
                            
            </>
          )}
                  
        </div>
              
      </header>
            
      <Switch>
                
        <Route exact path="/">
                    
          <RestaurantInfo
            ref={resInfoRef}
            clearValue={() => updateSearchValue('')}
          />
                  
        </Route>
                
        <Route path="/restaurant/:id" component={RestaurantDetails} />
              
      </Switch>
          
    </div>
  );
}
export default App;
