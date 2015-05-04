function Car () {
    this.startDate = Date.now();
    this.milesPerYear = 12000;
    this.currentMileage = 0;
    
    this.toJSON = function() {
        return JSON.stringify({"startDate":this.startDate, "milesPerYear":this.milesPerYear, "currentMileage":this.currentMileage});
    },
    
    this.fromJSON = function(jsonStr) {
        var data = JSON.parse(jsonStr);
        var newCar = new Car();
        newCar.StartDate = data.startDate;
        newCar.milesPerYear = data.milesPerYear;
        newCar.currentMileage = data.currentMileage;
        return newCar;
    }
}

function CarInit() {
    var c = new Car();
    var jsonStr = c.toJSON();
    console.log("toJSON: " + jsonStr);
    var nCar = c.fromJSON(jsonStr);
    console.log("fromJSON: " + nCar.toJSON());
}