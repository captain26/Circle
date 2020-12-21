from django.core.management.base import BaseCommand, CommandError
from busybeaver.models import StockDetails, Ticker
from bs4 import BeautifulSoup
import requests
import sqlite3
import pickle

def get_valuation_metrics(soup):
    valuation_metrics = {}
    consolidation_val = soup.find("div", {"id": "consolidated_valuation"})
    valuation_uls = consolidation_val.findAll("ul", {"class": "val_listinner"})
    for valuation_ul in valuation_uls:
        for li_item in valuation_ul.findAll("li"):
            divs = li_item.findAll("div")
            label = divs[0].text
            value = divs[1].text
            valuation_metrics[label] = value
    return valuation_metrics

def get_html_from_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content)
    return soup


def get_ticker_id(soup):
    ticker_id = soup.find("input", {"id": "nseid"})['value']
    return ticker_id.strip()

def parse_valuation_metrics(valuation_metrics):
    stockDetails = StockDetails()
    for metric, value in valuation_metrics.items():
        if value == '-':
            continue
        if metric == 'Market Cap (Rs Cr.)':
            stockDetails.market_cap = int(100*float(value.replace(',', '')))
        elif metric == 'P/E':
            stockDetails.pe = float(value.replace(',', ''))
        elif metric == 'Book Value (Rs)':
            stockDetails.book_value = int(100*float(value.replace(',', '')))
        elif metric == 'Dividend (%)':
            stockDetails.dividend = float(value.replace(',', ''))
        elif metric == 'Industry P/E':
            stockDetails.industry_pe = float(value.replace(',', ''))
        elif metric == 'EPS (TTM)':
            stockDetails.eps = int(100*float(value.replace(',', '')))
        elif metric == 'Price/Book':
            stockDetails.price_to_book = float(value.replace(',', ''))
        elif metric == 'Dividend Yield.(%)':
            stockDetails.dividend_yield = float(value.replace(',', ''))
        elif metric == 'Face Value (RS)':
            stockDetails.face_value = int(100*float(value.replace(',', '')))
    return stockDetails


def main():
    main_soup = get_html_from_url("https://www.moneycontrol.com/india/stockpricequote")
    company_list_soup = main_soup.find("table", {"class": "pcq_tbl"})
    data = {}
    for company_td in company_list_soup.findAll("td"):
        company_link = company_td.find("a")['href']
        company_name = company_td.text
        if len(company_link) > 0:
            soup = get_html_from_url(company_link)
            ticker_id = get_ticker_id(soup)
            valuation_metrics = get_valuation_metrics(soup)
            data[ticker_id] = valuation_metrics
            print(ticker_id, valuation_metrics)
    return data

class Command(BaseCommand):
    help = 'Scrap and save valuation metrics from Moneycontrol'

    def add_arguments(self, parser):

        parser.add_argument('file', type=str)
        parser.add_argument(
            '--tickers',
            action='store_true',
            help='Save all tickers first',
        )
        parser.add_argument(
            '--web',
            action='store_true',
            help='Fetch from web and dump to <file>'
        )
        parser.add_argument(
            '--valuations',
            action='store_true',
            help='Save valuations for all tickers'
        )
        
        
    
    def handle(self, *args, **options):
        filename = options['file']
        if options['web']:
            fopen = open(filename, 'wb')
            data = main()
            pickle.dump(data, fopen)
        else:
            fopen = open(filename, 'rb')
            data = pickle.load(fopen)
        if options['tickers']:
            for key in data.keys():
                ticker = Ticker(ticker_id=key)
                ticker.save()
        if options['valuations']:
            for ticker in Ticker.objects.all():
                stockDetails = parse_valuation_metrics(data[ticker.ticker_id])
                stockDetails.ticker_id = ticker
                stockDetails.save()
            
        fopen.close()
