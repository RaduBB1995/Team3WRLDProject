-------------------------------------
README for Scott's branch
-------------------------------------

Fundamentaly, the code is just in app.js, api-service.js and db.json.

There are a few dependencies based upon the tutorials I've looked at for this usecase however.

They use Yarn, so I have too, although npm should work fine with equivalent commands.

1. Navigate to root folder in GitBash, enter "yarn add wrld.js axios", which is the service for actually reading information from our JSON server

2. In same folder, "yarn add babel-core babel-plugin-transform-runtime babel-runtime --dev". They use babel to compile, unsure of whether we can change this.

3. touch .babelrc and enter the code below

{
  "plugins": [
    [
      "transform-runtime",
      {
        "polyfill": false,
        "regenerator": true
      }
    ]
  ]
}

4. We also need the local JSON-server host, so either "yarn global add json-server" or "npm install -g json server".

5. Open another Git Bash terminal, navigate to root folder, then enter "json-server --watch model/db.json" and it should inform you that on localhost:3000 the JSON server is being hosted

6. run parcel on index.html in the web folder in the original GitBash terminal, navigate to localhost:1234 and it should work (hopefully)
