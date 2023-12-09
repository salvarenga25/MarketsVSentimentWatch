
const jsonFileURL = "http://127.0.0.1:5000/csv_to_json";

currentTicker='COST'
// Use d3.json() to load the JSON file
d3.json(jsonFileURL).then(function(data) {
    // The ‘data’ variable now contains the parsed JSON data


    data.forEach(function(data){
        data.Close = parseFloat(data.Close)
        data.Open = parseFloat(data.Open)
        data.High = parseFloat(data.High)
        data.Low = parseFloat(data.Low)
        data.Volume = parseInt(data.Volume, 10)
    

    })


 console.log(data);

    candlystick(currentTicker,'1Y',data)
 

  
  








      // Function to handle button clicks on the graph
      document.querySelectorAll('.time-button').forEach(button => {
        button.addEventListener('click', function() {
          this.classList.toggle('active'); // Toggle 'active' class
        });
      });
  
      // Function to update the graph data based on the selected time period
      function updateGraph(timePeriod) {
        // Add your logic here to update the graph data
        // This function will be triggered when a button on the graph is clicked
        console.log('Updating graph for:', timePeriod);
      }

      function handleButtonClick(arg){

      }


////////////////////////////



    // Example: Display data in the console
// for (i=0; i < data.length; i++){

// Tickers.push(data[i]);

// }

//////////////////////



    data.forEach(function(item) {
        // console.log(item);
    });
    // Example: Render data on the webpage (modify as needed)
    
    
    
    
    
    renderData(data);
}).catch(function(error) {
    // Handle errors, if any
    console.error("Error loading JSON file:", error);
});




// function Ticker_Selection(TCKR){

//     if (data.ticker == TCKR){
//         return data
//     }


// }

function dateChange(str){
  // Your dummy data for the graph (replace with your actual data)
  if(str == '1D'){
   return '2023-11-28'
  }
  
  else if(str == '5D'){
  return '2023-11-23'
  }

  else if(str == '1M'){
  return '2023-10-28' 
  }

  else if(str == '6M'){
  return '2023-05-28'
  }

  else {
  return '2022-11-28'
  }

}

function candlystick(selectedvalue,dateRange, data){
    let parDate = dateChange(dateRange);
    let filter_data2=data.filter((data) => data.Ticker == selectedvalue && data.Date >= parDate)

    Tickers_dates = [];
    Ticker_High = [];
    Ticker_Low = [];
    Ticker_Open = [];
    Ticker_Close= [];

  
    console.log(filter_data2)
    for (let i =0; i < filter_data2.length; i++){

        Tickers_dates.push(filter_data2[i].Date);
        Ticker_Close.push(filter_data2[i].Close);
        Ticker_Open.push(filter_data2[i].Open);
        Ticker_High.push(filter_data2[i].High);
        Ticker_Low.push(filter_data2[i].Low);

        // console.log(AAL[i].dates)

    }

    var trace = {
        x:Tickers_dates,
        close:Ticker_Close,
        high: Ticker_High,
        low: Ticker_Low,
        open: Ticker_Open,
      
        // cutomise colors
        increasing: {line: {color: 'black'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };
      
      var data = [trace];
      
      var layout = {
        dragmode: 'zoom',
        showlegend: false,
        xaxis: {
          rangeslider: {
               visible: false
           }
        }
      };


      Plotly.newPlot('Historic_12_Month_Run', data, layout);

}


// Calling existing "optionChanged" function from HTML class to pass selected value through all my 3 functions (bubble,bar and dinfo functions)
function optionChanged(selectedvalue,dateStr){
    console.log(selectedvalue)
    currentTicker=selectedvalue
    d3.json(jsonFileURL).then((data) => {
  
  // Passing user selected value from the drop down and the data through each function to populate the graphs dynamically 
   candlystick(selectedvalue,dateStr, data)
   
  });
     
}
function updateDate(dateStr){
  d3.json(jsonFileURL).then((data) => {

  candlystick(currentTicker,dateStr, data)

  });
}
