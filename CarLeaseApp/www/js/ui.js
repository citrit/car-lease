
var uiUtils = {
carCharts: {},
    
    // Application Constructor
    init: function() {
        $('#startDate').val(new Date().toDateInputValue());
        $('#mileageDate').val(new Date().toDateInputValue());
        Chart.defaults.global.responsive = true;
    },
    
    addNewCar: function() {
        var cname = $("#carName").val();
        var cdate = new Date($("#startDate").val()).getTime();
        var duration = parseInt($("#duration").val());
        var mpy = parseInt($("#mpy").val());
        var cpm = parseFloat($("#cpm").val());
        
        var nCar = new Car(cname, cdate,duration,mpy, cpm);
        carLeaseApp.addCar(nCar);
        uiUtils.renderCars();
    },
    
    addCarMileage: function() {
        var cdate = new Date($("#mileageDate").val()).getTime();
        var mileage = parseInt($("#carMileage").val());
        carLeaseApp.addMileage(carLeaseApp.curCar, cdate, mileage);
        
        var monthsPassed = carLeaseApp.monthDiff(new Date(carLeaseApp.Cars[carLeaseApp.curCar].startDate), new Date(cdate));
        // The values array passed into addData should be one for each dataset in the chart
        uiUtils.carCharts[carLeaseApp.curCar].datasets[0].points[monthsPassed+1].value = mileage;
        //uiUtils.carCharts[carLeaseApp.curCar].addData([monthsPassed+1, mileage], ""+(monthsPassed+1));
        // This new data will now animate at the end of the chart.
        uiUtils.carCharts[carLeaseApp.curCar].update();
        console.log("Updating car chart");
        
        //uiUtils.renderCars();
    },
    
    delCar: function(cname) {
        carLeaseApp.delCar(cname);
        uiUtils.renderCars();
    },
    
    renderCars: function () {
        $('#carListDiv').empty();
        var carList = carLeaseApp.Cars;
        var cardStr = ''; //'<div class="ui-block-a">';
    
        for(var index in carList) {
            console.log("Loading car: " + JSON.stringify(carList[index]));
            var carDate = new Date(carList[index].startDate);
            cardStr += '<div class="card">' +
            '<h2>' + carList[index].carName + '</h2>' +
            'Lease Date: ' + carDate.toDateString() + '<br>' +
            'Lease Duration: ' + carList[index].leaseDuration + '<br>' +
            'Miles Per Year: ' + carLeaseApp.numberWithCommas(carList[index].milesPerYear) + '<br>' +
            //'Mileages: ' + JSON.stringify(carList[index].mileageRecords) + '<br>' +
            'Cost Per Mile: $ ' + carList[index].costPerMile.toFixed(2) + '<br>' +
            '<canvas id="carChart'+ carList[index].carName.replace(/\s+/g, '') + '" width="400" height="200" ></canvas>' +
            '<table style="width:100%"> <tr> <td>' +
            '<a href="#addMileage" data-role="button" data-theme="a" onclick="carLeaseApp.curCar = \'' + carList[index].carName + '\'">Add Mileage</a>' + 
            '</td><td> ' +
            '<a data-role="button" data-theme="a" onclick="uiUtils.delCar(\'' + carList[index].carName + '\')">Delete Car</a>' +
            '</td></tr></table></div>';
        }
        //cardStr += '</div>';
        $('#carListDiv').append(cardStr);
        for (var index in carList) {
            uiUtils.generateChartData(carList[index]);
        }
        
    },
    
    generateChartData: function(car) {
        // Get context with jQuery - using jQuery's .get() method.
        var ctx = $("#carChart"+ car.carName.replace(/\s+/g, '')).get(0).getContext("2d");
        ctx.canvas.width = 400;
        ctx.canvas.height = 200;
        
        var monthLabels = [];
        var leaseVals = [];
        var actualMiles = [];
        for (ii = 0; ii < car.leaseDuration; ii++ ) {
            monthLabels.push("" + ii);
            leaseVals.push((car.milesPerYear/12) * ii);
            actualMiles.push(0);
        }
        for(var index in car.mileageRecords) {
            var monthsPassed = carLeaseApp.monthDiff(new Date(car.startDate), new Date(parseInt(index)));
            actualMiles[monthsPassed+1] = car.mileageRecords[index];
            //console.log(new Date(car.startDate) + "  => " +  new Date(parseInt(index)) + "  monthsPassed: " + monthsPassed + "  Mileage: " + car.mileageRecords[index]);
            //console.log("actualMiles: " + JSON.stringify(actualMiles));
        }
        console.log("Actualmiles: " + JSON.stringify(actualMiles));
        var data = {
            labels: monthLabels,
            datasets: [
                    {
                       label: "Actual Miles",
                       fillColor: "rgba(256,0,0,0.6)",
                       strokeColor: "rgba(151,187,205,1)",
                       pointColor: "rgba(151,187,205,1)",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "rgba(151,187,205,1)",
                       data: actualMiles
                    },
                    {
                       label: "Lease Miles",
                       fillColor: "rgba(0,128,0,0.75)",
                       strokeColor: "rgba(220,220,220,1)",
                       pointColor: "rgba(220,220,220,1)",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "rgba(220,220,220,1)",
                       data: leaseVals
                    }
            ]
        };
        
        var options = {
            responsive: true,
            maintainAspectRatio: true
        }
        
        // This will get the first returned node in the jQuery collection.
        uiUtils.carCharts[car.carName] = new Chart(ctx).Line(data, options);
    }

}