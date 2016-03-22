var app = angular.module('snowmanApp');
app.controller('userController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://project-snowman.firebaseio.com/");
    var authData = ref.getAuth();

    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));

    $scope.submit = function()
    {
        //save the new service request to firebase
        service_requests.push({user: authData.uid, name: $scope.service_name, provider: "n/a", completed: false});
        $scope.service_name = "";
    }
});