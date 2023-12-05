
const jsonFileURL = "http://127.0.0.1:5000/csv_to_json";

Tickers= []
// Use d3.json() to load the JSON file
d3.json(jsonFileURL).then(function(data) {
    // The ‘data’ variable now contains the parsed JSON data
  
 
    // Example: Display data in the console
for (i=0; i < data.length; i++){

Tickers.push(data[i]);

}

console.log(Tickers);

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
  