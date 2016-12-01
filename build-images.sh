#!/bin/bash

# Fail on error
set -e

cd services/article-aggregate
npm install
docker build -t article-aggregate:1.1 .

cd ../bbc-scraper
npm install
docker build -t bbc-scraper:1.1 .

cd ../cnn-scraper
npm install
docker build -t cnn-scraper:1.1 .

cd ../slashdot-scraper
npm install
docker build -t slashdot-scraper:1.1 .

cd ../data-store
npm install
docker build -t data-store:1.1 .

cd ../id-service
npm install
docker build -t id-service:1.1 .

cd ../translation-service
npm install
docker build -t translation-service:1.1 .