var tasky = angular.module('tasky', ['ngRoute', 'ui.bootstrap'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider

            .when('/projects/:id', {
                controller: 'TaskController',
                templateUrl: "templates/tasks.html"
            })

            .when('/projects', {
                controller: 'ProjectsController',
                templateUrl: "templates/projects.html"
            })

            .otherwise({
                redirectTo: '/projects'
            });
    });
