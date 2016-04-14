import React from "react";
import jsonp from  "jsonp";
import http from "http";
import request from "superagent";
import xml2js from "xml2js";

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        numChickensCanHaz: -1,
        submitted: false,
    }
  }

  handleSubmit(e) {
    // X1-ZWz1f8a48oibyj_634pb
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zip = document.getElementById('zip').value;

    var zillowRequest;
    var DEBUG = true;
    if (DEBUG) {
        zillowRequest = `http://localhost:1337/http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1f8a48oibyj_634pb&address=${encodeURIComponent(address)}&citystatezip=${encodeURI(city + state + zip)}`;
    } else {
        zillowRequest = `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1f8a48oibyj_634pb&address=${encodeURIComponent(address)}&citystatezip=${encodeURI(city + state + zip)}`;
    }

    var callback = (err, res) => {
        console.log('zillow err:', err);
        console.log('zillow res:', res);
        xml2js.parseString(res.text, this.setChickensCanHaz.bind(this));
    }

    request
        .get(zillowRequest)
        .end(callback);
  }

  setChickensCanHaz(err, result) {
        // Full response json: console.log(JSON.stringify(result, null, 2));
        console.log(result)
        try {
            var lot = result['SearchResults:searchresults'].response['0'].results[0].result[0];
            var lotSizeSqFt = lot.lotSizeSqFt[0];
            console.log(lotSizeSqFt);
            var zoning = lot.useCode[0];

            // Here's the actual "ordinances"... I'm just pulling from comments found in the orignal project
            // ... it would be nice if we could somehow pull from the actual documents where the ordinances are found? NLP ftw!

            var numChickensCanHaz = 0;

            if (lotSizeSqFt >= 7000 && lotSizeSqFt < 12000 && zoning === "SingleFamily") {
                numChickensCanHaz = 4;
            } else if (lotSizeSqFt >= 12000 && zoning === "SingleFamily") {
                numChickensCanHaz = 20;
            }

            this.setState({
                submitted: true,
                numChickensCanHaz,
            });

        } catch (error) {
            this.setState({
                submitted: true,
                numChickensCanHaz: -1,
            });
        }
  }

  render() {
    var message = '';
    if (this.state.submitted) {
        if(this.state.numChickensCanHaz > 0) {
            message = `You can have a total of ${this.state.numChickensCanHaz} chickens! (No roosters!)`;
        } else if(this.state.numChickensCanHaz == -1) {
            message = 'Um... that address doesn\'t look right?';
        } else {
            message = `Sorry! Your lot isn't big enough for chickens.`;
        }
    }
    return (
      <div id="addressForm">
        Address:<input id="address" />
        City:<input id="city" />
        State:<input id="state" />
        Zip:<input id="zip" />
        <br />
        <button id="btnSubmit" type="button" className="btn btn-default btn-info" onClick={this.handleSubmit.bind(this)}>Submit!</button>
        <div id="chickensCanHaz" className={this.state.submitted ? 'show' : 'hidden'}>
            { message }
        </div>
      </div>
    );
  }

}

export default AddressForm;