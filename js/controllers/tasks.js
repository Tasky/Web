tasky.controller('TaskController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {

            $scope.project = data;
            $scope.tasks = data.tasks;

            if(localStorage) {
                localStorage.setItem('project-'+$routeParams.id, JSON.stringify(data));
                localStorage.setItem('tasks-'+$routeParams.id, JSON.stringify(data.tasks));
            }
        }).error(function(data){
            if(localStorage) {
                $scope.project = JSON.parse(localStorage.getItem('project-'+$routeParams.id));
                $scope.tasks = JSON.parse(localStorage.getItem('tasks-'+$routeParams.id));
            }
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
