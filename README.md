# statlete-website

> Statlete Reports Page

## Adding a new file:
1)  Go to the statlete-reports-website firebase console at: https://console.firebase.google.com/u/0/project/statlete-reports-website/overview <br>
2)  navigate to the "Storage" tab<br>
3)  click on your name<br>
4)  then the "Upload file" button.<br>

5)  After uploading your file go to the Realtime Database and add an entry under your name. The key for this entry doesn't matter (it is ignored) other than it has to be unique. The value MUST be the same filename as the one you uploaded.

If you refresh the website it should update automatically.

<b>NOTE:</b> I will leave one entry with the key "file1" and a sample value file, I will just ignore these in the code eventually so you are safe to leave them to use as an example.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


to deploy an updated version run the following:

$ npm run build
$ firebase deploy
