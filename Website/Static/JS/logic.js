
const jsonFileURL = "http://127.0.0.1:5000/csv_to_json";
const json_news = "http://127.0.0.1:5000/Ticker_News";

//global variable
let currentTicker='AAL'
let maxLength = 253; //Stock Market is closed on weekends, so there are roughly 253 working days left in a year
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

    candlystick(currentTicker,'1Y',data);
      // Function to handle button clicks on the graph
      document.querySelectorAll('.time-button').forEach(button => {
        button.addEventListener('click', function() {
          this.classList.toggle('active'); // Toggle 'active' class
        });
      });
  
      // Function to update the graph data based on the selected time period
     // function updateGraph(timePeriod) {
        // Add your logic here to update the graph data
        // This function will be triggered when a button on the graph is clicked
     //   console.log('Updating graph for:', timePeriod);
     // }

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

d3.json(json_news).then((newsdata) => {
  // Passing user selected value from the drop down and the data through each function to populate the graphs dynamically 
  tickernews(currentTicker, newsdata);
}).catch(function(error) {
  // Handle errors, if any
  console.error("Error loading JSON News file:", error);
});




// function Ticker_Selection(TCKR){

//     if (data.ticker == TCKR){
//         return data
//     }


// }

function dateChange(str){
  // Number of working days returned in maxLength were calculated in timeanddate.com
  if(str == '1D'){
    maxLength = 1;
   return '2023-11-28'
  }
  
  else if(str == '5D'){
  maxLength = 3;
  return '2023-11-23'
  }

  else if(str == '1M'){
  maxLength = 20;
  return '2023-10-28' 
  }

  else if(str == '6M'){
  maxLength = 125;
  return '2023-05-28'
  
  }

  else { 
  maxLength = 253;
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
  let Ticker_Close = [];
  let Ticker_Volume = [];


  let Ticker_50DayMA = []; // Array to hold 5-day moving average data
  let Ticker_200DayMA = []; // Array to hold 5-day moving average data


  
  console.log(filter_data2)

  for (let i = 0; i < maxLength; i++) {
      Tickers_dates.push(filter_data2[i].Date);
      Ticker_Close.push(filter_data2[i].Close);
      Ticker_Open.push(filter_data2[i].Open);
      Ticker_High.push(filter_data2[i].High);
      Ticker_Low.push(filter_data2[i].Low);
      Ticker_Volume.push(filter_data2[i].Volume);
      Ticker_50DayMA.push(filter_data2[i]["50_Day_MA"]); // Assuming the field name is "50_Day_MA"
      Ticker_200DayMA.push(filter_data2[i]["200_Day_MA"]); // Assuming the field name is "200_Day_MA"
  }

  //Check if filter_data2.length is too big
  console.log("Filtered length is this long", filter_data2.length);

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

  var layout = {
      dragmode: 'zoom',
      showlegend: true,
      legend: {
          x: 0,
          y: 1,
          orientation: 'h'
      },
      xaxis: {
          rangeslider: {
              visible: false
          }
      },
      title: {
        text: `Candlestick Chart for ${selectedvalue}`,
        font: {
            family: 'Arial Black, sans-serif',
            size: 18,
            color: 'black',
            weight: 'bold' // Set the font weight to bold for the title
        }}
  
      
  };
  //50-Day Moving Average
  var trace50DayMA = {
    x: Tickers_dates,
    y: Ticker_50DayMA, // Plotting 5-day moving average on the same x-axis as dates
    type: 'scatter',
    mode: 'lines',
    line: {
      color: 'blue', // Adjust the color as needed
      width: 1
    },
    name: '50-Day Moving Average'
  };

  var layoutMA = {
    yaxis2: {
        overlaying: 'y'
    }
};

  //200-Day Moving Average
  var trace200DayMA = {
    x: Tickers_dates,
    y: Ticker_200DayMA, // Plotting 200-day moving average on the same x-axis as dates
    type: 'scatter',
    mode: 'lines',
    line: {
      color: 'purple', // Adjust the color as needed
      width: 1
    },
    name: '200-Day Moving Average'
  };

  var layoutMA200 = {
    showlegend:true,
    legend: {
      x: 0,
      y: 1,
      orientation: 'h'
  },

    yaxis2: {  
        overlaying: 'y'
        
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
      },
      title: {
        text: `Stock Volume for ${selectedvalue}`,
        font: {
          family: 'Arial Black, sans-serif',
          size: 18,
          color: 'black',
          weight: 'bold' // Set the font weight to bold for the title
      }}
    
  };
  dataCandlestick.push(trace50DayMA,trace200DayMA);

  // Combine layout for both candlestick and moving average
  var layoutCombined = Object.assign({}, layout, layoutMA,layoutMA200);

  // Move the legend above the graph
  layoutCombined.legend = {
    x: 0.2,
    y: 1.15,
    orientation: 'h',
    xanchor: 'center',
    yanchor: 'bottom'
  };

  // Add margin to accommodate the legend above the graph
  // layoutCombined.margin = {
  //   t: 60, // Adjust top margin to provide space for the legend
  //   b: 50, // You may adjust the other margins as needed
  //   l: 50,
  //   r: 50
  // };

  Plotly.newPlot('Historic_12_Month_Run', dataCandlestick, layoutCombined);
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

function tickernews(selectedvalue, data_news) {
      
      // Clear existing articles before populating with new data
      d3.select("#article-list").html("");
    
      let Article_Title = [];
      let Article_Summarys = [];
      let Article_URL = [];
      let Ticker = [];
      let Article_Image=[];
    
      // Uncomment and adjust the filter condition as needed
      let filter_news = data_news.filter((data_news) => data_news["Ticker_name"] === selectedvalue);
      
      // Move the console.log outside the loop to see the entire array
      console.log(Article_Title);
    
      for (let i = 0; i < filter_news.length; i++) {
        Article_Title.push(filter_news[i]["Title"]);
        Ticker.push(filter_news[i]["Ticker_name"]);
        Article_Summarys.push(filter_news[i]["Summary"]);
        Article_URL.push(filter_news[i]["URL"]);

        //code to add image 
        Article_Image.push(filter_news[i]["Banner_Image"])
      }
        const existingArticleList = d3.select("#article-list");
        // Add your logic for appending articles to the existing article list if needed

           // Append titles and summaries to the existing article list
      for (let i = 0; i < Article_Title.length; i++) {
          const listItem = existingArticleList.append("li");
        // Create an image element
        const image = listItem.append("img")
        .attr("src", Article_Image[i]) // Set image source to URL from JSON data
        .attr("alt", "Article Image"); // Set alternative text for the image

        // Create a div for text content
        const textDiv = listItem.append("div").style("display", "inline-block").style("vertical-align", "top");


        // Create a title element
        textDiv.append("h4")
        .style("font-weight", "bold") // Set title font-weight to bold
        .text(Article_Title[i]); // Set the title text

        // Create a summary element
        textDiv.append("p")
        .text(Article_Summarys[i]); // Set the summary text

        // Create a link element
        const link = textDiv.append("a")
        .attr("href", Article_URL[i]) // Set the link href to URL from JSON data
        .attr("target", "_blank") // Open link in a new tab
       // .style("display", "block") // Set the display to block for new line
        .text("Read more"); // Set the link text
  }



    }

      
  
    function updateDate(dateStr){
      d3.json(jsonFileURL).then((data) => {
    
      candlystick(currentTicker,dateStr, data)
    
      });
    }
    