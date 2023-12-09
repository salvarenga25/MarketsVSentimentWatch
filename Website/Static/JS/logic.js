const jsonFileURL = "http://127.0.0.1:5000/csv_to_json";

Tickers= []
// Use d3.json() to load the JSON file
d3.json(jsonFileURL).then(function(data) {
    // The ‘data’ variable now contains the parsed JSON data

    data.forEach(function(data){
        data.Close = parseFloat(data.Close)
        data.Open = parseFloat(data.Open)
        data.High = parseFloat(data.High)
        data.Low = parseFloat(data.Low)
        data.Volume = parseInt(data.Volume, 10)
    });

    console.log(data);

    candlystick("COST", data);

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

    function handleButtonClick(arg) {

    }

    // Example: Display data in the console
    for (i = 0; i < data.length; i++) {
        Tickers.push(data[i]);
    }

    data.forEach(function(item) {
        // console.log(item);
    });
    // Example: Render data on the webpage (modify as needed)
    renderData(data);
}).catch(function(error) {
    // Handle errors, if any
    console.error("Error loading JSON file:", error);
});

function candlystick(selectedvalue, data) {
    let filter_data2 = data.filter((data) => data.Ticker == selectedvalue);

    let Tickers_dates = [];
    let Ticker_High = [];
    let Ticker_Low = [];
    let Ticker_Open = [];
    let Ticker_Close = [];
    let Ticker_Volume = [];

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
        increasing: { line: { color: 'black' } },
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
            text: `Candlestick Chart for ${selectedvalue}`
        }
    };

    // Volume chart
    var traceVolume = {
        x: Tickers_dates,
        y: Ticker_Volume,
        type: 'bar',
        yaxis: 'y2',
        name: 'Volume'
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
function optionChanged(selectedvalue) {
    console.log(selectedvalue)

    d3.json(jsonFileURL).then((data) => {

        // Passing user selected value from the drop down and the data through each function to populate the graphs dynamically 
        candlystick(selectedvalue, data)

    });
}
