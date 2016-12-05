#!/bin/bash

# Fail on error
set -e

cd services/article-aggregate
npm install
docker build -t meventures/demo-article-aggregate:1.1 .

cd ../bbc-scraper
npm install
docker build -t meventures/demo-bbc-scraper:1.1 .

cd ../cnn-scraper
npm install
docker build -t meventures/demo-cnn-scraper:1.1 .

cd ../slashdot-scraper
npm install
docker build -t meventures/demo-slashdot-scraper:1.1 .

cd ../data-store
npm install
docker build -t meventures/demo-data-store:1.1 .

cd ../id-service
npm install
docker build -t meventures/demo-id-service:1.1 .

cd ../translation-service
npm install
docker build -t meventures/demo-translation-service:1.1 .

cd ../article-frontend
npm install
ng build --target=production --sourcemap=false
docker build -t meventures/demo-article-frontend:1.2 .