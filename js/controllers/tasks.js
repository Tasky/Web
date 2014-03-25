tasky.controller('TaskController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        console.log($routeParams);
        $http.get('http://tasky.nl/api/project/'+$routeParams.id+'/').success(function(data) {


            console.log(data);
            $scope.project = data;
            $scope.tasks = data.tasks;


        });
    }]);
