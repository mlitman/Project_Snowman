var app = angular.module('snowmanApp');
app.controller('userController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://project-snowman.firebaseio.com/");
    var authData = ref.getAuth();
    
    $scope.reset = function()
    {
        $scope.serviceType = "";
        $scope.costPerUnit = 0;
        $scope.snow_numberOfCars = 0;
        $scope.lawn_numberOfCars = 0;
        $scope.snow_instructions = "";
        $scope.lawn_instructions = "";
        $scope.$apply();
    }

    $scope.changeLawn = function() 
    {
        $scope.lawn_numberOfCars = this.lawn_numberOfCars;
        $scope.lawn_instructions = this.lawn_instructions;
    };

    $scope.changeSnow = function() 
    {
        $scope.snow_numberOfCars = this.snow_numberOfCars;
        $scope.snow_instructions = this.snow_instructions;
    };

    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));

    $scope.newServiceRequest = function(type, size, instructions, cost)
    {
        console.log("type: " + type);
        console.log("cost: " + cost);
        console.log("size: " + size);
        //save the new service request to firebase
        service_requests.push({user: authData.uid, name: type, type: type, instructions: instructions, cost: cost, size: size, provider: "n/a", completed: false});
    }

    $scope.snowRemovalButtonOnClick = function()
    {
        this.serviceType = "snow";
        this.costPerUnit = 10;
        this.snow_numberOfCars = 0;
        this.snow_instructions = "";
    }

    $scope.lawnMowingButtonOnClick = function()
    {
        this.serviceType = "lawn";
        this.costPerUnit = 8;
        this.lawn_numberOfCars = 0;
        this.lawn_instructions = "";
    }
});