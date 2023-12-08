
const jsonFileURL = "http://127.0.0.1:5000/csv_to_json";

Tickers= []
// Use d3.json() to load the JSON file
d3.json(jsonFileURL).then(function(data) {
    // The ‘data’ variable now contains the parsed JSON data
  
 data.forEach(function(data){
    data.Close = parseFloat(data.Close)
    data.Open = parseFloat(data.Close)
    data.High = parseFloat(data.High)
    data.Low = parseFloat(data.Low)
    data.Volume = parseInt(data.Volume, 10)
   

 })




const AAL = data.filter(function(ticker){

    if(ticker.Ticker == "AAL" & ticker.Date > "2023-01-01"){

        return ticker 

    }

    return


})

// console.log(AAL)
// console.log(data)



    // Your dummy data for the graph (replace with your actual data)
    Tickers_dates = [];
    AAL_High= [];
    AAL_Low= [];
    AAL_Open = [];
    AAL_Close= [];
    
    for (let i =0; i < AAL.length; i++){

        Tickers_dates.push(AAL[i].Date);
        AAL_Close.push(AAL[i].Close);
        AAL_Open.push(AAL[i].Open);
        AAL_High.push(AAL[i].High);
        AAL_Low.push(AAL[i].Low);

        // console.log(AAL[i].dates)

    }

    // console.log(AAL_Close)
    let dates =Tickers_dates;
    // let prices = AAL_Close; // Values represent prices for each month

console.log(dates);
 
    //   // Create the Historic 12-Month Run graph
    //   var layout = {
    //     title: 'Historic 12-Month Run',
    //     xaxis: {
    //       title: 'Dates',
    //     //   tickvals: Array.from({ length: 13 }, (_, i) => i), // Generate tickvals from 0 to 12 for 13 months
    //       ticktext: dates
    //     //   range: [0, 12] // Set the x-axis range to display 13 months
    //     },
    //     yaxis: {
    //       title: 'Price',
    //       range: [8, 20]
    //     }
    //   };
  
    //   var data = [{
    //     x: dates, // Generate x values from 0 to 12 for 13 months
    //     y: prices, // Assign your actual data for the y-axis
    //     type: 'scatter',
    //     // mode: 'lines',
    //     // marker: { color: 'blue' }
    //   }];
    


    // var trace2 = {
    //     x: dates,
    //     y:prices,
    //     type:'scatter',
    //     // text:filter_data2[0]["otu_labels"] ,
    //     mode: 'markers',
    
    //   };

    //   var data =[trace2];
    //   var layout ={
    //     title:'Title',

    //   };

  
  


    var trace = {
        x:Tickers_dates,
        close:AAL_Close,
        high: AAL_High,
        low: AAL_Low,
        open: AAL_Open,
      
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



////////////////////////////



    // Example: Display data in the console
for (i=0; i < data.length; i++){

Tickers.push(data[i]);

}

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








function renderData(data) {
    // Modify this function to render the data on your webpage as needed
    // For example, you could update the DOM to display the data


  



    }