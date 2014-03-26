var tasky = angular.module('tasky', ['ngRoute', 'ui.bootstrap'])
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

            .otherwise({
                redirectTo: '/projects'
            });
    });
