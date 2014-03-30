tasky.controller('ProjectsList', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get(url+'/projects').success(function(data) {
            $scope.projects = data;
            if(localStorage) localStorage.setItem('projects', JSON.stringify(data));
        }).error(function(data){
            if(localStorage) $scope.projects = JSON.parse(localStorage.getItem('projects'));
            console.log('error');
        });

        $scope.delete = function(id) {
            if(confirm("Weet je dit zeker?")){
                $http.delete(url+'/project/'+id).success(function(data) {
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

            $http.post(url+'/project', {
                name: $scope.projectName
            }).success(function(data) {
                window.location = '#/projects/'+data;
            }).error(function(data) {
                // TODO: error handling
                alert("huilie :'( \n"+data)
            });
        };
    }]);
