tasky.controller('ProjectsList', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('http://tasky.nl/api/projects').success(function(data) {
            $scope.projects = data;
        });
    }]);

tasky.controller('ProjectsNew', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.action = 'Aanmaken';

        $scope.save = function() {
            if($scope.projectName == "") {
                return;
            }

            $http.post('http://tasky.nl/api/projects', {
                name: $scope.projectName
            }).success(function(data) {

            }).error(function(data) {
                    // TODO: error handling
                    alert("huilie :'( \n"+data)
                });
        };
    }]);
