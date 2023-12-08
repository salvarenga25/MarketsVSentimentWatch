# Import the dependencies.
from flask import Flask, jsonify
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #Used so that js can access data from website

#Dictonary to create the JSON
data = []

#Dictionary to store the ticker labels
tickers=[]
 # CSV Files directories
csv_file_path_AAL = "Resources/AAL_NASDAQ.csv"
csv_file_path_COST = "Resources/COST_NASDAQ.csv"
csv_file_path_DAL = "Resources/DAL_NYSE.csv"
csv_file_path_WMT = "Resources/WMT_NYSE.csv"
csv_file_path_NYSE = "Resources/NYSE.csv"
csv_file_path_NASDAQ = "Resources/NASDAQ.csv"
csv_file_path_SP500 = "Resources/S&P500.csv"



@app.route("/")
def hello_world():
    return "Hello, World!"


# Create a route for reading AAL_NASDAQ
@app.route("/csv_to_json")
def csv_to_json():


    data_AAL = read_csv(csv_file_path_AAL,'AAL')
    data_COST = read_csv(csv_file_path_COST,'COST')
    data_DAL = read_csv(csv_file_path_DAL,'DAL')
    data_WMT = read_csv(csv_file_path_WMT, 'WMT')

    data_NYSE = read_csv(csv_file_path_NYSE,'NYSE')
    data_NASDAQ = read_csv(csv_file_path_NASDAQ,'NASDAQ')
    data_SP500 = read_csv(csv_file_path_SP500, 'SP500')


    # For testing and debugging
    # for row in data_AAL:
    #     # Add a new field to each row
    #     row["Ticker"] = "AAL"
    #     data.append(row)

   
    #combined data and tickers
    # combined_data = {
    #     "Tickers":tickers,
    #     "Features":data
    # }

    # Convert to JSON


    json_data = jsonify(data)
    

    return json_data



# Creating a function to read the CSV files 
def read_csv(file_path, TCKR):
    
    with open(file_path, "r") as file:
        csv_reader = csv.DictReader(file)
        tickers.append(TCKR)        
        for row in csv_reader:
            row["Ticker"] = TCKR
            data.append(row)


#############################################
if __name__ == "__main__":
    app.run(debug=True)












