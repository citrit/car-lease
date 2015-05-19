function Car (name, startdate, duration, mpy, cpm) {
    name = typeof name !== 'undefined' ? name : NewCar;
    startdate = typeof startdate !== 'undefined' ? startdate : Date.now();
    duration = typeof duration !== 'undefined' ? duration : 36;
    mpy = typeof mpy !== 'undefined' ? mpy : 12000;
    cpm = typeof cpm !== 'undefined' ? cpm : 0.10;
    this.carName = name;
    this.startDate = startdate;
    this.leaseDuration = duration;
    this.milesPerYear = mpy;
    this.mileageRecords = {};
    //this.mileageRecords[dnow] = 0;
    this.costPerMile = cpm;
    
    this.toJSON = function() {
        return JSON.stringify({"carName": this.carName, "startDate":this.startDate, "milesPerYear":this.milesPerYear, "mileageRecords":this.mileageRecords, "costPerMile":this.costPerMile, "leaseDuration":this.leaseDuration});
    },
    
    this.fromJSON = function(jsonStr) {
        var data = JSON.parse(jsonStr);
        var newCar = new Car();
        newCar.carName = data.carName;
        newCar.startDate = data.startDate;
        newCar.milesPerYear = data.milesPerYear;
        newCar.mileageRecords = data.mileageRecords;
        newCar.costPerMile = data.costPerMile;
        newCar.leaseDuration = data.leaseDuration;
        return newCar;
    }
}
