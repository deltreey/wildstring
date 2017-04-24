'use strict';
module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    jsdoc: {
      dist: {
        src: ['wildstring.js', 'test/*.js', 'README.md'],
        options: {
          destination: 'documentation',
          template : 'node_modules/ink-docstrap/template',
          configure : 'jsdoc.conf.json'
        }
      }
    },
    mochacli: {
      options: {
        reporter: 'spec',
        'harmony-generators': true
      },
      all: ['test/*.js']
    },
    karma: {
      unit: {
        options: {
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'wildstring.js',
            'karma-test/**/*.js'
          ],
          reporters: 'mocha',
          frameworks: ['mocha', 'chai'],
          singleRun: true,
          browsers: ['PhantomJS'],
          logLevel: 'ERROR'
        },
      }
    },
    watch: {
      gruntfile: {
        files: '<%=  jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jshint:js', 'mochacli']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochacli']
      }
    },
    versioner: {
      options: {
        gitPush: false,
        gitPushTag: false,
        tagPrefix: ''
      },
      default: {
        files: {
          './package.json': ['./package.json']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma', 'mochacli']);
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('document', ['jsdoc']);
  grunt.registerTask('update', ['document', 'versioner:default']);
};
