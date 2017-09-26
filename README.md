# Insta Crawler
Fetches public instagram posts of a given username and stores it in Firebase and Algolia

### Prerequisite
- Create firebase account (Free) - For storage
- Create Algolia account (Free) - For powering search
- Download firebase admin sdk private key (json file), rename it to ```serviceAccountKey.json``` and put in inside ```database``` folder along with ```firebase.js``` and ```insert.js```  
- Create ```.env``` file in the root of the cloned project

| Content of .env file | Description |
| ------ | ------ |
| ALGOLIA_APP_ID="XXXXXXXXXX" | Your algolia app id |
| ALGOLIA_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" | Your algolia api key |
| FIREBASE_DATABASE_URL="https://xxxxxx.firebaseio.com" | Your firebase database url |

#### Note: 
Each values inside .env file should be added in a new line.


### Running
- Clone the repository.
- CD to the cloned directory
- Run ```$ npm install```
- Open index.js file and replace the value in ```USERNAME``` variable with the one you want to crawl.
- ```$ node index.js```
- That's it! - You can view the crawled data in fiebase database and algolia
