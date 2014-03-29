tasky.controller('TaskController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        console.log($routeParams);
        $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {


            console.log(data);
            $scope.project = data;
            $scope.tasks = data.tasks;


        });
    }]);
