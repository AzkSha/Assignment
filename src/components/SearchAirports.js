import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import Calendar from 'moedim';
import '../../src/custom.css';

function SearchAirports(){

    const [source, setSource] = useState("");    
    const [airports,setAirports] = useState("");
    const [airportSuggestions,setAirportSuggestions] = useState([]);

    const [destination, setDestination] = useState("");    
    const [destAirports,setDestAirports] = useState("");
    const [destAirportSuggestions,setDestAirportSuggestions] = useState([]);

    const [deptDate, setDeptDate] = useState(new Date());
    const [arrDate, setArrDate] = useState(new Date());

      useEffect(() => {
        const getData = setTimeout(() => {
          axios
          .get(`https://dev.charterpad.com/serve/api/airport/${source}/keyword`)
          .then((response) => {
            //console.log(response.data.result);
            setAirports(response.data.result);
          });
        }, 100)
        return () => clearTimeout(getData)
    }, [source])

    useEffect(() => {
        const getData = setTimeout(() => {
          axios
          .get(`https://dev.charterpad.com/serve/api/airport/${destination}/keyword`)
          .then((response) => {
            //console.log(response.data.result);
            setDestAirports(response.data.result);
          });
        }, 100)
        return () => clearTimeout(getData)
    }, [destination])

    const onChangeSourceHandler = (text) => {        

        let matches = [];

        if(airports.length > 0 && text.length > 0){
            console.log('airports',airports);
            matches = airports.filter(airport=>{
                const regex = new RegExp(`${text}`,"gi");
                return airport.fullName.match(regex);
            }); 
        }       
        setAirportSuggestions(matches);    
        setSource(text);    
    }

    const onSuggestHandler = (text) =>{
        //setText(text);
        //setSuggestions([]);
        setSource(text);
        setAirportSuggestions([]);
    } 

    const onChangeDestHandler = (text) => {        

        let matches = [];

        if(destAirports.length > 0 && text.length > 0){
            console.log('airports',airports);
            matches = destAirports.filter(airport=>{
                const regex = new RegExp(`${text}`,"gi");
                return airport.fullName.match(regex);
            }); 
        }       
        setDestAirportSuggestions(matches);    
        setDestination(text);    
    }

    const onDestSuggestHandler = (text) =>{        
        setDestination(text);
        setDestAirportSuggestions([]);
    } 

    return(        
        <div>
           <form class="form-inline">
            <div class="form-group">
                <div class="input-group">
                <label for="between" class="mr-2">Source</label>
                <input
                placeholder="Source"
                value={source}
                onChange={(event) => onChangeSourceHandler(event.target.value)}
                className="form-control col-xs-4"/>
                    {airportSuggestions && airportSuggestions.map((suggestion,i)=>
                        <div key={i}
                        onClick={() => onSuggestHandler(suggestion.name)} 
                        className="suggestion">{suggestion.name}</div>
                    )}
                <div class="input-group-prepend">
                    <div class="input-group-text"> </div>
                </div>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                <label for="and" class="mr-2 ml-2">Destination</label>
                <input
                    placeholder="Destination"
                    value={destination}
                    onChange={(event) => onChangeDestHandler(event.target.value)}
                    className="form-control col-xs-4"
                />
                {destAirportSuggestions && destAirportSuggestions.map((suggestion,i)=>
                    <div key={i}
                    onClick={() => onDestSuggestHandler(suggestion.name)} 
                    className="suggestion col-md-12 justify-content-md-centered"
                    >{suggestion.name}</div>
                )}
                <div class="input-group-prepend">
                    <div class="input-group-text"> </div>
                </div>
                </div>
            </div>
            </form>
            
            <div className='mb-5 mt-2 col-md-12'>
            <form class="form-inline">
                <div class="form-group">
                    <div class="input-group">
                    <label for="between" class="mr-2">Departure Date</label>
                    <Calendar value={arrDate} onChange={(d) => setArrDate(d)} className="form-control"/>
                    <div class="input-group-prepend">
                        <div class="input-group-text"> </div>
                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                    <label for="and" class="mr-2 ml-2">Arrival Date</label>
                    <Calendar value={deptDate} onChange={(d) => setDeptDate(d)} className="form-control" />
                    <div class="input-group-prepend">
                        <div class="input-group-text"> </div>
                    </div>
                    </div>
                </div>
            </form>                
            </div>

            <div class="container">
            <div class="row">
                <div class="col text-center">
                <button class="btn btn-default">Search</button>
                </div>
            </div>
            </div>
        </div> 
    );
}

export default SearchAirports;