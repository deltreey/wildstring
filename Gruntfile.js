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
        src: ['index.js', 'test/*.js', 'README.md'],
        options: {
          destination: 'documentation',
          template : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
          configure : 'jsdoc.conf.json'
        }
      }
    },
    mochacli: {
      options: {
        reporter: 'nyan',
        'harmony-generators': true
      },
      all: ['test/*.js']
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

  grunt.registerTask('default', ['jshint', 'mochacli']);
  grunt.registerTask('document', ['jsdoc']);
  grunt.registerTask('update', ['document', 'versioner:default']);
};
