var app = angular.module('snowmanApp');
app.controller('userController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://project-snowman.firebaseio.com/");
    var authData = ref.getAuth();
    $scope.serviceType = "snow";
    $scope.costPerUnit = 10;
    $scope.lawn_numberOfCars = 0;
    $scope.snow_numberOfCars = 0;

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
        $scope.serviceType = "snow";
        $scope.costPerUnit = 10;
    }

    $scope.lawnMowingButtonOnClick = function()
    {
        $scope.serviceType = "lawn";
        $scope.costPerUnit = 8;
    }
});