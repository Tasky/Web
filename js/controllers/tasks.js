tasky.controller('TaskController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        console.log($routeParams);
        $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {


            console.log(data);
            $scope.project = data;
            $scope.tasks = data.tasks;


        });
    }]);

tasky.controller('TaskNew', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.action = 'Taak Aanmaken';

        $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {
            $scope.project = data;
            $scope.tasks = data.tasks;
        });

        $scope.save = function() {
            console.log("SAVE");
            if($scope.taskName == null || $scope.taskName == "") {
                return;
            }

            $http.post(url+'/project/'+$routeParams.id+'/task', {
                name: $scope.taskName
            }).success(function(data) {
                window.location = '#/projects/'+$routeParams.id;
            }).error(function(data) {
                // TODO: error handling
                alert("huilie :'( \n"+data)
            });
        };
    }]);
