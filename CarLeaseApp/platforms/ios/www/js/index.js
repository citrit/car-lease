/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var carLeaseApp = {
    Cars: {},
    curCar: "",
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'carLeaseApp.receivedEvent(...);'
    onDeviceReady: function() {
        uiUtils.init();
        carLeaseApp.receivedEvent('deviceready');
        carLeaseApp.loadCars();
        uiUtils.renderCars();
        //CarTest();
        //DBFuncs.init();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    },
    
    saveCars: function() {
        console.log("SaveCarsList: " + JSON.stringify(carLeaseApp.Cars));
        window.localStorage.setItem("carList", JSON.stringify(carLeaseApp.Cars));
    },
    
    loadCars: function() {
        var carsStr = window.localStorage.getItem("carList");
        if (typeof carsStr !== 'undefined' && carsStr !== null) {
            console.log("JSON.parse: " + carsStr);
            //carLeaseApp.Cars = eval( '( ' + carsStr + ' )');
            carLeaseApp.Cars = JSON.parse(carsStr);
            if ( typeof carLeaseApp.Cars[Object.keys(carLeaseApp.Cars)[0]] === 'string') {
	            for (var ind in carLeaseApp.Cars) {
	            	console.log("Parsing car string: " + carLeaseApp.Cars[ind]);
	                carLeaseApp.Cars[ind] = JSON.parse(carLeaseApp.Cars[ind]);
	                for (var indx in carLeaseApp.Cars[ind].mileageRecords) {
	                    carLeaseApp.Cars[ind].mileageRecords[parseInt(indx)] = carLeaseApp.Cars[ind].mileageRecords[indx];
	                    delete carLeaseApp.Cars[ind].mileageRecords[indx];
	                }
	            }
            }
            console.log("loadedCarsList: " + JSON.stringify(carLeaseApp.Cars));
        }
    },
    
    addCar: function(car) {
        if (car) {
            carLeaseApp.Cars[car.carName] = car;
            carLeaseApp.saveCars();
        }
    },
    
    addMileage: function (ncar,  date, mileage) {
        if (ncar) {
            carLeaseApp.Cars[ncar].mileageRecords[date] = mileage;
            carLeaseApp.saveCars();
        }
    },

    delCar: function(carName) {
        if (carName) {
            delete carLeaseApp.Cars[carName];
            carLeaseApp.saveCars();
        }
    },
    
    numCars: function() {
        return Object.keys(carLeaseApp.Cars).length
    },
    
    numberWithCommas: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    monthDiff: function (d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
};

//page load initialization
$( window ).load(function(){
    console.log("Onload " + navigator.platform);
    document.addEventListener('deviceready', carLeaseApp.onDeviceReady, false);
    if (navigator.platform == 'MacIntel')
        carLeaseApp.onDeviceReady();
});

function CarTest() {
    var c = new Car();
    c.carName = "Honda";
    c.startDate = new Date("September 13, 2014 11:13:00").getTime();
    c.mileageRecords[new Date("October 13, 2014 11:13:00").getTime()] = 1000;
    c.mileageRecords[new Date("November 13, 2014 11:13:00").getTime()] = 1500;
    c.mileageRecords[new Date("December 13, 2014 11:13:00").getTime()] = 2900;
    c.mileageRecords[new Date("January 13, 2015 11:13:00").getTime()] = 4500;
    c.mileageRecords[new Date("February 13, 2015 11:13:00").getTime()] = 6000;
    
    var jsonStr = c.toJSON();
    console.log("toJSON: " + jsonStr);
    var nCar = new Car();
    nCar.carName = "Subaru";
    nCar.startDate = new Date("February 13, 2012 11:13:00").getTime();
    nCar.mileageRecords[new Date("October 13, 2012 11:13:00").getTime()] = 8000;
    nCar.mileageRecords[new Date("November 13, 2012 11:13:00").getTime()] = 8500;
    nCar.mileageRecords[new Date("December 13, 2012 11:13:00").getTime()] = 9900;
    nCar.mileageRecords[new Date("January 13, 2013 11:13:00").getTime()] = 10000;
    nCar.mileageRecords[new Date("February 13, 2013 11:13:00").getTime()] = 10900;
    
    console.log("fromJSON: " + nCar.toJSON());
    carLeaseApp.addCar(c);
    carLeaseApp.addCar(nCar);
    carLeaseApp.saveCars();
    uiUtils.renderCars();
    console.log("Num cars: " + carLeaseApp.numCars());
    carLeaseApp.delCar(nCar.carName);
    console.log("Num cars: " + carLeaseApp.numCars());
}

Date.prototype.toDateInputValue = (function() {
                                   var local = new Date(this);
                                   local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                                   return local.toJSON().slice(0,10);
                                   });

