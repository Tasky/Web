tasky.controller('ProjectsController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('http://tasky.nl/api/projects').success(function(data) {
            console.log(data);
            $scope.projects = data;
//            $scope.mainImageUrl = data.images[0];
        });
    }]);
