

tasky.controller('Activities', ['$scope', '$routeParams', '$http', '$interval', function($scope, $routeParams, $http, $interval) {
    $scope.name = "Activities";
    $scope.params = $routeParams;

    var started = false;
    // http://tasky.nl/api/project/3
    $scope.action = 'play';
    $scope.currenttime = 0;

    $scope.map = {
        center: {
            lat: 52.3167,
            lng: 5.5500,
            zoom: 7
        },
        markers: [],
        defaults: {
            scrollWheelZoom: false,
            tileLayer: "https://{s}.tiles.mapbox.com/v3/examples.map-9ijuk24y/{z}/{x}/{y}.png"
        }
    };

    $scope.new = {
//        type: "Werk",
        startTime: new Date(),
        endTime: new Date()
    };

    var ival;
    var sec = 0;

    $scope.updateTime = function() {
        var diff = $scope.new.endTime - $scope.new.startTime;

        if(!isNaN(diff)) {
            sec = Math.floor(Math.abs(diff / 1000));
        }
    };

    $scope.timer = function() {
        if($scope.action == 'play') {
            $scope.new.startTime = new Date();
            $scope.new.endTime = new Date();
            $scope.task.activities.reverse();
            $scope.task.activities.push($scope.new);
            $scope.task.activities.reverse();

            $scope.action = 'pause';

            ival = $interval(function() {
                sec++;
                $scope.new.endTime = new Date();
                if(sec % 60 == 0 && sec >= 60) {
                    if(!$scope.new.hasOwnProperty('id')) {
                        $http.post(url + '/project/' + $routeParams.id + '/task/' + $routeParams.taskid+'/activity', $scope.new).success(function (data) {
                            $scope.new.id = data;
                        });
                    } else {
                        $http.put(url + '/project/' + $routeParams.id + '/task/' + $routeParams.taskid+'/activity', $scope.new);
                    }
                }

            }, 1000);
        } else {
            $interval.cancel(ival);
            $scope.action = 'play';
        }
    };

    $http.get(url+'/project/'+$routeParams.id+'/').success(function(data) {
        $scope.project = data;
        $scope.tasks = data.tasks;
    }).error(function(data){
        if(localStorage) {
            $scope.project = JSON.parse(localStorage.getItem('project-' + $routeParams.id));
            $scope.tasks = JSON.parse(localStorage.getItem('tasks-' + $routeParams.id));
        }
    });

    $http.get(url+'/project/'+$routeParams.id+'/task/'+$routeParams.taskid).success(function(data) {
        for (var i = 0; i < data.activities.length; i++) {
            var act = data.activities[i];
            act.startTime = new Date(act.startTime);
            act.endTime = new Date(act.endTime);

            $scope.map.markers.push({
                lat: act.lat,
                lng: act.lon,
                focus: false,
                draggable: false
            });
        }
        $scope.task = data;
        $scope.task.activities.reverse();
        if(localStorage) localStorage.setItem('task-'+$routeParams.taskid, JSON.stringify(data));
    }).error(function(data){
        if(localStorage)  {
            $scope.task = JSON.parse(localStorage.getItem('task-'+$routeParams.id));
            console.log(JSON.parse(localStorage.getItem('task-'+$routeParams.id)));
            //$scope.tasks.activities.reverse();
        }
    });

    function setGeo(data) {
        $scope.new.lat = data.coords.latitude;
        $scope.new.lon = data.coords.longitude;
    }

    function geoFail() {
        angular.element(document.getElementById('geo-btn')).removeClass('btn-success');
        angular.element(document.getElementById('geo-btn')).addClass('btn-danger');
        disableGeo();
    }

    function disableGeo(){
        $scope.new.lat = undefined;
        $scope.new.lon = undefined;
    }

    $scope.toggleGeo = function(elem) {
        if($scope.geoIsActive) {
            if(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(setGeo, geoFail);
        }else
            disableGeo();
    }
}]);