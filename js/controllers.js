var url;
//url = 'http://localhost:8080';
url = 'http://tasky.nl/api';
var tasky = angular.module('tasky', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
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
