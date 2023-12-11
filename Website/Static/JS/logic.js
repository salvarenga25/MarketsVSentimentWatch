
const jsonFileURL = "http://127.0.0.1:5000/csv_to_json";
const json_news = "http://127.0.0.1:5000/Ticker_News";

let currentTicker='COST'
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

    let Tickers_dates = [];
    let Ticker_High = [];
    let Ticker_Low = [];
    let Ticker_Open = [];
    let Ticker_Close= [];
    let Ticker_Volume = [];
    //For table values
    let Ticker_OpenPrice = [];
    let Ticker_ClosePrice = [];
    let Ticker_52high = [];
    let Ticker_52low = [];

  
    console.log(filter_data2)
    for (let i =0; i < filter_data2.length; i++){

  for (let i = 0; i < filter_data2.length; i++) {
      Tickers_dates.push(filter_data2[i].Date);
      Ticker_Close.push(filter_data2[i].Close);
      Ticker_Open.push(filter_data2[i].Open);
      Ticker_High.push(filter_data2[i].High);
      Ticker_Low.push(filter_data2[i].Low);
      Ticker_Volume.push(filter_data2[i].Volume);
  }

  var trace = {
      x: Tickers_dates,
      open: Ticker_Open,
      high: Ticker_High,
      low: Ticker_Low,
      close: Ticker_Close,
      increasing: { line: { color: 'green' } },
      decreasing: { line: { color: 'red' } },
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y',
      name: 'Candlestick'
  };

  // Candlestick chart
  var dataCandlestick = [trace];

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
        legend:{
          x:0,
          y:1,
          orientation:'h'
        },
        xaxis: {
          rangeslider: {
              visible: false
          }
      },
      title: {
          text: `Candlestick Chart for ${selectedvalue}`
      }
  };

  // Volume chart
  var traceVolume = {
      x: Tickers_dates,
      y: Ticker_Volume,
      type: 'bar',
      yaxis: 'y2',
      name: 'Volume',
      marker: {
          color: Ticker_Close.map((close, i) => {
              if (i > 0) {
                  return close >= Ticker_Close[i - 1] ? 'green' : 'red';
              }
              return 'green';
          })
      }
  };

  var dataVolume = [traceVolume];

  var layoutVolume = {
      yaxis2: {
          title: 'Volume',
          overlaying: 'y',
          side: 'right'
      }
  };

  Plotly.newPlot('Historic_12_Month_Run', dataCandlestick, layout);
  Plotly.newPlot('volumeChart', dataVolume, layoutVolume);
}



// Calling existing "optionChanged" function from HTML class to pass selected value through all my 3 functions (bubble,bar and dinfo functions)
function optionChanged(selectedvalue,dateStr) {
  console.log(selectedvalue)
  currentTicker=selectedvalue
  d3.json(jsonFileURL).then((data) => {
      // Passing user selected value from the drop down and the data through each function to populate the graphs dynamically 
      candlystick(selectedvalue,dateStr, data)
  });

  d3.json(json_news).then((newsdata) => {
      // Passing user selected value from the drop down and the data through each function to populate the graphs dynamically 
      tickernews(selectedvalue, newsdata);
  });
}
    /////////////////////////////////////////

// // Tickers= []
// let Article_Title = []
// let Article_Summarys = []
// let Article_URL = []
// // Use d3.json() to load the JSON file
// d3.json(json_news).then(function(data) {
//     // The ‘data’ variable now contains the parsed JSON data
//     for(let i=0; i< data.length; i++) {

//       Article_Title.push(data[i]["Title"]);
//       Article_Summarys.push(data[i]["Summary"]);
//       Article_URL.push(data[i]["URL"]);
  

//     }

//     const existingArticleList = d3.select("#article-list");

//     // Append titles and summaries to the existing article list
//     for (let i = 0; i < Article_Title.length; i++) {
//       const listItem = existingArticleList.append("li");
//       const link = listItem.append("a").attr("href", Article_URL[i]).attr("target", "_blank").text(`${Article_Title[i]}: `);
//       listItem.append("span").text(Article_Summarys[i]);
//   }

//     console.log(data)



// })



    /////////////////////////////////////////

    function tickernews(selectedvalue, data_news) {
      
      // Clear existing articles before populating with new data
      d3.select("#article-list").html("");
    
      let Article_Title = [];
      let Article_Summarys = [];
      let Article_URL = [];
      let Ticker = [];
    
      // Uncomment and adjust the filter condition as needed
      let filter_news = data_news.filter((data_news) => data_news["Ticker_name"] === selectedvalue);
      
      // Move the console.log outside the loop to see the entire array
      console.log(Article_Title);
    
      for (let i = 0; i < filter_news.length; i++) {
        Article_Title.push(filter_news[i]["Title"]);
        Ticker.push(filter_news[i]["Ticker_name"]);
        Article_Summarys.push(filter_news[i]["Summary"]);
        Article_URL.push(filter_news[i]["URL"]);
      }
        const existingArticleList = d3.select("#article-list");
        // Add your logic for appending articles to the existing article list if needed

           // Append titles and summaries to the existing article list
      for (let i = 0; i < Article_Title.length; i++) {
          const listItem = existingArticleList.append("li");
          const link = listItem.append("a").attr("href", Article_URL[i]).attr("target", "_blank").text(`${Article_Title[i]}: `);
          listItem.append("span").text(Article_Summarys[i]);
      }




      
    }


  function updateDate(dateStr){
    d3.json(jsonFileURL).then((data) => {
  
    candlystick(currentTicker,dateStr, data)
  
    });
  }
  }
