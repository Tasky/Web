var url;
//url = 'http://localhost:8080';
url = 'http://tasky.nl/api';

var tasky = angular.module('tasky', ['ngRoute', 'ui.bootstrap', 'leaflet-directive'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(false);
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/projects', {
                controller: 'ProjectsList',
                templateUrl: "templates/projects/list.html"
            })

            .when('/projects/new', {
                controller: 'ProjectsNew',
                templateUrl: "templates/projects/edit.html"
            })

            .when('/projects/:id', {
                controller: 'TaskController',
                templateUrl: "templates/tasks.html"
            })

            .when('/projects/:id/task', {
                controller: 'TaskNew',
                templateUrl: 'templates/tasks/new.html'
            })

            .when('/projects/:id/task/:taskid/activities', {
                controller: 'Activities',
                templateUrl: 'templates/activities.html'
            })

            .otherwise({
                redirectTo: '/projects'
            });
    });

//tasky.factory('myHttpResponseInterceptor',['$q','$location',function($q,$location){
//    return {
//        'responseError': function(rejection) {
//            // do something on error
//            document.getElementById("navbar").style.backgroundColor = "#fa8089";
//            document.getElementById("navbar").style.color = "black";
//            var el = document.getElementById("view");
//            el.innerHTML = '<div class="bs-callout bs-danger"><h4>Geen verbinding</h4><p>Er is geen connectie met Tasky.nl.</p></div>';// + el.innerHTML;
//
////            if (canRecover(rejection)) {
////                return responseOrNewPromise
////            }
//            return $q.reject(rejection);
//        }
//    }
//}]);
////Http Intercpetor to check auth failures for xhr requests
//tasky.config(['$httpProvider',function($httpProvider) {
//    $httpProvider.interceptors.push('myHttpResponseInterceptor');
//}]);
