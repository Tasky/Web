tasky.controller('ProjectsList', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('http://tasky.nl/api/projects').success(function(data) {
            $scope.projects = data;
            console.log(data);
        });

        $scope.delete = function(id) {
            if(confirm("Weet je dit zeker?")){
                $http.delete('http://tasky.nl/api/project/'+id).success(function(data) {
                    window.location = '#/projects/';
                });
            }
        };

    }]);

tasky.controller('ProjectsNew', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.action = 'Aanmaken';

        $scope.save = function() {
            if($scope.projectName == null || $scope.projectName == "") {
                return;
            }

            $http.post('http://tasky.nl/api/project', {
                name: $scope.projectName
            }).success(function(data) {
                window.location = '#/projects/'+data;
            }).error(function(data) {
                // TODO: error handling
                alert("huilie :'( \n"+data)
            });
        };
    }]);
