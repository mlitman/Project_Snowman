var app = angular.module('indexApp', ["firebase"]);
app.controller('indexController', function($scope) 
{
    $scope.login = function() 
    {
        $scope.test = "Index Controller";
        var ref = new Firebase("https://project-snowman.firebaseio.com/");
        console.log($scope.username);
        ref.authWithPassword({
        email    : $scope.username,
        password : $scope.password
    }, function(error, authData) 
    {
        if (error) 
        {
            console.log(error);
        }
        else 
        {
            window.location.href = 'home.html';
        }
    });
    };
});