import React from 'react';
import SearchAirports from './components/SearchAirports';

function App() { 

  return (   
    
    <div className="container">
     <div>
      <h2 className='display-4 text-center'>
        Search Flights
      </h2>
      
      <SearchAirports />
     </div>
    </div>  
    
  );
}

export default App;
