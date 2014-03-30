tasky.controller('Activities', ['$scope', '$routeParams', '$http', '$interval', function($scope, $routeParams, $http, $interval) {
    $scope.name = "Activities";
    $scope.params = $routeParams;

    
    var started = false;
    // http://tasky.nl/api/project/3
    $scope.action = 'play';
    $scope.currenttime = 0;

    var ival;
    var sec = 0;

    var calculateTime = function() {
        function padLeft(nr, n, str){
            return Array(n-String(nr).length+1).join(str||'0')+nr;
        }

        var hour = Math.floor(sec / (60*60));
        var min = Math.floor(sec / 60);
        $scope.currenttime = padLeft(hour,2) + ":" + padLeft(min, 2) + ":" + padLeft(sec % 60, 2);
    };


    calculateTime();

    $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {
        $scope.project = data;
        $scope.tasks = data.tasks;
    });

    $http.get(url+'/project/'+$routeParams.id+'/task/'+$routeParams.taskid).success(function(data) {
        $scope.task = data;

        $scope.timer = function() {
            var today=new Date();
            if($scope.action == 'play') {
                if(!started) {
                    $scope.starttime = today;
                    started = true;
                }
                $scope.action = 'pause';

                ival = $interval(function() {
                    sec++;
                    calculateTime();
                }, 1000);

            } else {
                $interval.cancel(ival);
                $scope.stoptime = today;
                $scope.action = 'play';
            }
        };
    });
}]);