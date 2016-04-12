var app = angular.module('snowmanApp');
app.controller('userController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://project-snowman.firebaseio.com/");
    var authData = ref.getAuth();
    
    $scope.changeLawn = function() 
    {
        console.log("change lawn");
        console.log(this.lawn_numberOfCars);
        $scope.lawn_numberOfCars = this.lawn_numberOfCars;
    };

    $scope.changeSnow = function() 
    {
        console.log("change snow");
        console.log(this.snow_numberOfCars);
        $scope.snow_numberOfCars = this.snow_numberOfCars;
    };

    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));

    $scope.newServiceRequest = function()
    {
        //save the new service request to firebase
        var instructions = "";
        var size = "";
        var cost = 0;
        if($scope.serviceType == "snow")
        {
            instructions = $scope.snow_instructions;
            size = $scope.snow_numberOfCars;
            cost = size * costPerUnit;
        }
        else
        {
            instructions = $scope.lawn_instructions;
            size = $scope.lawn_numberOfCars;
            cost = size * costPerUnit;
        }

        service_requests.push({user: authData.uid, type: $scope.serviceType, instructions: instructions, cost: cost, size: size, provider: "n/a", completed: false});
    }

    $scope.snowRemovalButtonOnClick = function()
    {
        this.serviceType = "snow";
        this.costPerUnit = 10;
        this.snow_numberOfCars = 0;
    }

    $scope.lawnMowingButtonOnClick = function()
    {
        this.serviceType = "lawn";
        this.costPerUnit = 8;
        this.lawn_numberOfCars = 0;
    }
});