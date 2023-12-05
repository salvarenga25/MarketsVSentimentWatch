# Import the dependencies.
from flask import Flask, jsonify
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello, World!"


# Create a route for reading AAL_NASDAQ
@app.route("/csv_to_json")
def csv_to_json():

    # Read CSV fileS FOR TICKERS
    csv_file_path_AAL = "Resources\AAL_NASDAQ.csv"
    csv_file_path_COST = "Resources\COST_NASDAQ.csv"
    csv_file_path_DAL = "Resources\DAL_NYSE.csv"
    csv_file_path_WMT = "Resources\WMT_NYSE.csv"


    csv_file_path_NYSE = "Resources\\NYSE.csv"
    csv_file_path_NASDAQ = "Resources\\NASDAQ.csv"
    csv_file_path_SP500 = "Resources\\S&P500.csv"

    data_AAL = read_csv(csv_file_path_AAL)
    data_COST = read_csv(csv_file_path_COST)
    data_DAL = read_csv(csv_file_path_DAL)
    data_WMT = read_csv(csv_file_path_WMT)

    data_NYSE = read_csv(csv_file_path_NYSE)
    data_NASDAQ = read_csv(csv_file_path_NASDAQ)
    data_SP500 = read_csv(csv_file_path_SP500)

    data = []

   
    for row in data_AAL:
        # Add a new field to each row
        row["Ticker"] = "AAL"
        data.append(row)

    for row in data_COST:
        # Add a new field to each row
        row["Ticker"] = "COST"
            
        data.append(row)

    for row in data_DAL:
        
        # Add a new field to each row
        row["Ticker"] = "DAL"
        data.append(row)
 
    for row in data_WMT:
        # Add a new field to each row
        row["Ticker"] = "WMT"
        data.append(row)

    for row in data_NYSE:
        # Add a new field to each row
        row["Ticker"] = "NYSE"
        data.append(row)

    for row in data_NASDAQ:
        # Add a new field to each row
        row["Ticker"] = "NASDAQ"
        data.append(row)

    for row in data_SP500:
        # Add a new field to each row
        row["Ticker"] = "S&P500"
        data.append(row)


    # Convert to JSON
    json_data_AAL = jsonify(data)
    

    return json_data_AAL



# Creating a function to read the CSV files 
def read_csv(file_path):
    data = []
    with open(file_path, "r") as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append(row)

    return data

#############################################


if __name__ == "__main__":
    app.run(debug=True)












