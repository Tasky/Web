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
            return new Array(n-String(nr).length+1).join(str||'0')+nr;
        }

        var hour = Math.floor(sec / (60*60));
        var min = Math.floor(sec / 60);
        $scope.currenttime = padLeft(hour,2) + ":" + padLeft(min, 2) + ":" + padLeft(sec % 60, 2);
    };

    $scope.edit = function() {

        var diff = $scope.stoptime - $scope.starttime;

        sec = Math.abs(diff / 1000);
        console.log(sec);

        calculateTime();
    };

    $scope.save = function() {
        alert('afsddsaf');
    };

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

    calculateTime();

    $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {
        $scope.project = data;
        $scope.tasks = data.tasks;
    });

    $http.get(url+'/project/'+$routeParams.id+'/task/'+$routeParams.taskid).success(function(data) {
        $scope.task = data;
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