# Import the dependencies.
from flask import Flask, jsonify
import csv
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) #Used so that js can access data from website

#Dictonary to create the JSON
data = []


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

    # Convert to JSON
    json_data = jsonify(data)
    

    return json_data



# Creating a function to read the CSV files 
def read_csv(file_path, TCKR):
   
    
    with open(file_path, "r") as file:
        csv_reader = csv.DictReader(file)     
        close_prices = [] 
        for row in csv_reader:
            row["Ticker"] = TCKR
            close_prices.append(float(row["Close"]))
            # Calculate 50-day moving average
            if len(close_prices) >= 50:
                row["50_Day_MA"] = sum(close_prices[-50:]) / 50
            else:
                row["50_Day_MA"] = None
            
            # Calculate 200-day moving average
            if len(close_prices) >= 200:
                row["200_Day_MA"] = sum(close_prices[-200:]) / 200
            else:
                row["200_Day_MA"] = None
            data.append(row)
            


#############################################
@app.route("/Ticker_News")
def Ticker_News():

    Ticker_Dict_AAL = [
     {"Ticker_name": "AAL",
        "Title": "CWA-IBT Association Reaches Agreement with American Airlines",
        "Summary": "FORT WORTH, Texas, Dec. 7, 2023 /PRNewswire/ -- The Communications Workers of America ( CWA ) -International Brotherhood of Teamsters ( IBT ) Association has reached a tentative agreement with American Airlines on a new five-year contract covering approximately 16,000 passenger service agents.",
        "Banner_Image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
        "URL": "https://www.benzinga.com/pressreleases/23/12/n36145719/cwa-ibt-association-reaches-agreement-with-american-airlines"
    },  
    
    {"Ticker_name": "AAL",
        "Title": "American Airlines earnings outlook disappoints, shares fall",
        "Summary": "July 20 (Reuters) - Shares of American Airlines (AAL.O) fell on Thursday as its outlook for the second half of the year disappointed investors even as the company lifted its full-year profit forecast and posted higher-than-expected quarterly earnings.",
        "Banner_Image": "https://www.reuters.com/resizer/g29itIUTwOH1wQeUSGZJpo98cCQ=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/IV5XYNI4W5MFHNZBLJD3F5PE5M.jpg",
        "URL": "https://www.reuters.com/business/aerospace-defense/american-airlines-raises-2023-profit-forecast-travel-boom-2023-07-20/"

    },

    
    {"Ticker_name": "AAL",
        "Title": "US Airlines Make Hay in Yesterday's Trading: Here's Why",
        "Summary": "The southward oil price movement supports growth of airline stocks like Delta (DAL), American Airlines (AAL) and United Airlines (UAL).",
        "Banner_Image": "https://staticx-tuner.zacks.com/images/articles/main/51/2072.jpg",
        "URL": "https://www.zacks.com/stock/news/2194717/us-airlines-make-hay-in-yesterdays-trading-heres-why"},


    {"Ticker_name": "COST",
        "Title": "I compared grocery prices at Costco, Walmart, and HEB for a family of 4. I was shocked Walmart wasn't a better bargain.",
        "Summary": "Grocery prices at HEB, Walmart, and Costco for a family of four - Business Insider",
        "Banner_Image": "https://i.redd.it/duelj56cjq061.png",
        "URL": "https://www.businessinsider.com/grocery-prices-heb-walmart-costco-food-prices-comparison-best-deals-2023-12"},


        
    {"Ticker_name": "COST",
        "Title": "Peering Into Costco Wholesale's Recent Short Interest - Costco Wholesale  ( NASDAQ:COST )",
        "Summary": "Costco Wholesale's COST short percent of float has risen 20.0 percent since its last report. The company recently reported that it has 5.31 million shares sold short, which is 1.2 percent of all regular shares that are available for trading.",
        "Banner_Image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_18.jpeg?width=1200&height=800&fit=crop",
        "URL": "https://www.benzinga.com/short-sellers/23/12/36157095/peering-into-costco-wholesales-recent-short-interest"},

    {"Ticker_name": "COST",
        "Title": "I'm a busy mom who shops at Costco on a budget of $100 a month. Here are my 10 favorite things to get there for my 3 kids.",
        "Summary": "Best things to get family on $100 budget at Costco, from busy mom - Business Insider",
        "Banner_Image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_18.jpeg?width=1200&height=800&fit=crop",
        "URL": "https://www.businessinsider.com/best-costco-things-mom-gets-for-family-on-a-budget-2023-12"},

    {"Ticker_name": "DAL",
        "Title": "How Delta Air Lines Uses A.I.",
        "Summary": "Many people chatter about A.I. but now an actual functioning airline has started to use the technology Speaking Wednesday at an investor conference, Delta Air Lines executives said the carrier has started to use artificial intelligence in two ways: to quickly make procedures known to reservations ...",
        "Banner_Image": "https://staticx-tuner.zacks.com/images/articles/main/51/2072.jpg",
        "URL": "https://www.forbes.com/sites/tedreed/2023/12/07/how-delta-air-lines-uses-ai-yet-avoids-hallucinations-on-steroids/"},

    {"Ticker_name": "DAL",
        "Title": "Delta Air Lines's Options: A Look at What the Big Money is Thinking - Delta Air Lines  ( NYSE:DAL ) ",
        "Summary": "Deep-pocketed investors have adopted a bullish approach towards Delta Air Lines DAL, and it's something market players shouldn't ignore. Our tracking of public options records at Benzinga unveiled this significant move today.",
        "Banner_Image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_18.jpeg?width=1200&height=800&fit=crop",
        "URL": "https://www.benzinga.com/markets/options/23/12/36119399/delta-air-liness-options-a-look-at-what-the-big-money-is-thinking"},

    {"Ticker_name": "DAL",
        "Title": "Delta Air reaffirms profit and revenue forecasts for 2023 ",
        "Summary": "Delta Air reaffirms profit and revenue forecasts for 2023",
        "Banner_Image": "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/GUM72ZX76VIIBPL7PRHHB562C4.jpg",
        "URL": "https://www.reuters.com/business/aerospace-defense/delta-air-reaffirms-profit-revenue-forecasts-2023-2023-12-06/"},

        


    {"Ticker_name": "WMT",
        "Title": "This family just bumped Walmart's Waltons as the richest in the world",
        "Summary": "he world's richest families combined got $1.5 trillion wealthier this year, thanks in part to petroleum fortunes and booming luxury brands.",
        "Banner_Image": "https://images.mktw.net/im-45318323/social",
        "URL": "https://www.marketwatch.com/story/this-family-just-bumped-walmarts-waltons-as-the-richest-in-the-world-46627317"},

        
    {"Ticker_name": "WMT",
        "Title": "Walmart Adapts To \"Normalized\" Hiring, But Consumer Caution Looms Large - CFO Says It \"Made Us Sit Up In Our Chair\" - Walmart  ( NYSE:WMT )",
        "Summary": "Walmart Inc's WMT CEO Doug McMillon reportedly discussed changes in the company's hiring and employee retention. Doug noted that the hiring situation has become more \"normalized\" following the unique challenges posed by the pandemic, according to a news report by CNBC.",
        "Banner_Image": "https://cdn.benzinga.com/files/images/story/2023/12/07/wmt_1.png?width=1200&height=800&fit=crop",
        "URL": "https://www.benzinga.com/markets/equities/23/12/36130091/walmart-adapts-to-normalized-hiring-but-consumer-caution-looms-large-cfo-says-it-made-us-sit-up-"},

    {"Ticker_name": "WMT",
        "Title": "Walmart Taking Lead To Lower Prices With Current Customer Mood",
        "Summary": "Dough McMillon, CEO of Walmart , spoke on CNBC about the effort of the company to drive down prices. He stressed the company's ability to keep prices on their own brand merchandise at low levels and that management encourages national brands to reduce the selling price of their goods as well.",
        "Banner_Image": "https://imageio.forbes.com/specials-images/imageserve/637140fd73935c1203a8fb80/0x0.jpg?format=jpg&crop=2072,809,x0,y0,safe&height=900&width=1600&fit=bounds",
        "URL": "https://www.forbes.com/sites/walterloeb/2023/12/07/walmart-taking-lead-to-lower-prices-with-current-customer-mood/"},

     {"Ticker_name": "SP500",
        "Title": "S&P 500 notches new high for 2023 Friday, on six-week hot streak after solid economic data: Live updates",
        "Summary": "The S&P 500 rose on Friday to hit a new high for the year after the November jobs report and University of Michigan consumer survey data signaled a resilient economy and cooling inflation, fueling hopes for a so-called soft landing scenario.",
        "Banner_Image": "https://static-redesign.cnbcfm.com/dist/3318ff8e87ae8eed0d95.svg",
        "URL": "https://www.cnbc.com/2023/12/07/stock-market-today-live-updates.html"},

    
     {"Ticker_name": "NYSE",
        "Title": "Wall St Week Ahead Year-end rally in US stocks faces twin tests as Fed, inflation data loom",
        "Summary": "NEW YORK, Dec 8 (Reuters) - The Federal Reserves last monetary policy meeting of 2023 and a U.S. inflation report in coming days should test a stock market rally that some view as stretched following weeks of gains.",
        "Banner_Image": "https://www.reuters.com/resizer/gVGXnk_80zghFE8Ao19Cqfw7x7k=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/67S7ITAVGZIWTOBKLEUIEQULPM.jpg",
        "URL": "https://www.reuters.com/markets/us/wall-st-week-ahead-year-end-rally-us-stocks-faces-twin-tests-fed-inflation-data-2023-12-08/"},
    {"Ticker_name": "NASDAQ",
        "Title": "Markets today: Wall Street's AI craze drives Nasdaq 100 up 1.5%",
        "Summary": "A rally in megacaps spurred a rebound in stocks on speculation the artificial-intelligence boom will keep fueling market gains.",
        "Banner_Image": "https://www.bnnbloomberg.ca/polopoly_fs/1.2008774!/fileimage/httpImage/image.png_gen/derivatives/default/chart.png",
        "URL": "https://www.bnnbloomberg.ca/markets-today-wall-street-s-ai-craze-drives-nasdaq-100-up-1-5-1.2008275"},


]

  

    return jsonify(Ticker_Dict_AAL)



print(data)

if __name__ == "__main__":
    app.run(debug=True)












