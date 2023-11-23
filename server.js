const express = require ("express");
const app = express();
var counterArray = {};

app.listen(3000, (_, res) => {
    console.log("Server connected successfully");
  } )

app.get("/test", (req,res) => {
  return res.send ({count : counterFunction ("test")});
})

app.get("/:name", (req,res) => {
  let name = req.params.name;
  return res.send({count : counterFunction (name)})
})

const counterFunction = (endpointName) => {
  if(counterArray[endpointName] != null) {
     counterArray[endpointName] += 1;
     return counterArray[endpointName]
  } else {
      //let tempObj =  { `${endpointName}` : 1}
      //counterArray = Object.assign(counterArray, tempObj)
      counterArray [endpointName] = 1;
      return counterArray[endpointName];
    }
}

//login
//registration
//token
//use token to reset endpoint count
//handle error and send responses
//rendom dont need to be authenticated
