function Car () {
    this.name = "New car";
    this.startDate = Date.now();
    this.milesPerYear = 12000;
    this.currentMileage = 0;
    
    this.toJSON = function() {
        return JSON.stringify({"name": this.name, "startDate":this.startDate, "milesPerYear":this.milesPerYear, "currentMileage":this.currentMileage});
    },
    
    this.fromJSON = function(jsonStr) {
        var data = JSON.parse(jsonStr);
        var newCar = new Car();
        newCar.name = data.name;
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
    carLeaseApp.addCar(nCar);
    console.log("Num cars: " + carLeaseApp.numCars());
    carLeaseApp.delCar(nCar);
    console.log("Num cars: " + carLeaseApp.numCars());

}