tasky.controller('Activities', ['$scope', '$routeParams', '$http', '$interval', function($scope, $routeParams, $http, $interval) {
    $scope.name = "Activities";
    $scope.params = $routeParams;

    var started = false;
    // http://tasky.nl/api/project/3
    $scope.action = 'play';
    $scope.time = 0;

    var ival;
    var sec = 700;

    var calculateTime = function() {
        



    };

    $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {
        $scope.project = data;
        $scope.tasks = data.tasks;
    });

    $http.get(url+'/project/'+$routeParams.id+'/task/'+$routeParams.taskid).success(function(data) {
        $scope.task = data;

        $scope.timer = function() {
            var today=new Date();
            var h=today.getHours();
            var m=today.getMinutes();
            var s=today.getSeconds();
            if($scope.action == 'play') {
                ival = $interval(function() {
                    sec++;
                    $scope.time = sec;
                    calculateTime();
                }, 1000);

                if(!started) {
                    $scope.starttime = h + ':' + m + ':' + s;
                    started = true;
                }
                $scope.action = 'pause';
            } else {
                $interval.cancel(ival);
                $scope.stoptime = h + ':' + m + ':' + s;
                $scope.action = 'play';
            }
        };
    });

    function setGeo(data) {
        $scope.lat = data.coords.latitude;
        $scope.lon = data.coords.longitude;
    }

    function geoFail() {
        angular.element(document.getElementById('geo-btn')).removeClass('btn-success');
        angular.element(document.getElementById('geo-btn')).addClass('btn-danger');
        disableGeo();
    }

    function disableGeo(){
        $scope.lat = undefined;
        $scope.lon = undefined;
    }

    $scope.toggleGeo = function(elem) {
        if($scope.geoIsActive) {
            if(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(setGeo, geoFail);
        }else
            disableGeo();
    }
}]);