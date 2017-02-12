var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');


module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      app: webpackConfig,
    },
    express: {
      options: {},
      server: {
        options: {
          script: '<%= pkg.folders.server %>/server.js',
        }
      },
    },
    less : {
      dev: {
        options: {
          rootpath: '.',
          compress: false,
          yuicompress: false,
          optimization: 0,
          sourceMap: false
        },
        files: [{
          './public/css/app.css': [
            '<%= pkg.folders.assets %>/less/bootstrap.less'
          ]
        }]
      },
    },

    watch: {
      server: {
        options: {
          nospawn: true, //Without this option specified express won't be reloaded
          atBegin: true,
        },
        // triggering livereload when the files are updated
        // allows livereload to not do a full page refresh
        files: ['<%= pkg.folders.server %>/**/*.js'],
        tasks: ['express:server']
      },
      less: {
        files: ['<%= pkg.folders.assets %>/less/**/*.less'],
        tasks: ['less:dev']
      },
      webpack: {
        files: ['<%= pkg.folders.app %>/**/*.js'],
        tasks: ['webpack:dev']
      }
    },

    // Wiredep for inject bower dependencies
    // into app/app/index.html
    // it take cares about the server root replacing the
    // absolute path to a custom one
    wiredep: {
      task: {
        cwd: '',
        src: ['<%= pkg.folders.views %>/main.html'],
        fileTypes: {
          html: {
            block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
            detect: {
              js: /<script.*src=['"]([^'"]+)/gi,
              css: /<link.*href=['"]([^'"]+)/gi
            },
            replace: {
              js: (path) => {
                path = _getWiredepPath(path);
                return '<script src="' + path + '"></script>';
              },
              css: (path) => {
                path = _getWiredepPath(path);
                return '<link rel="stylesheet" href="' + path + '"/>'
              }
            }
          }
        }
      }
    },

    parallel: {
      dev: {
        options: {
          stream: true
        },
        tasks: [
          {
            grunt: true,
            args: ['wiredep']
          },
          {
            grunt: true,
            args: ['watch:server']
          },
          {
            grunt: true,
            args: ['less:dev', 'watch:less']
          },
          {
            grunt: true,
            args: ['webpack:app', 'watch:webpack']
          }
        ]
      },
    }
  });

  grunt.registerTask('default', ['parallel:dev']);

  function _getWiredepPath(path) {
    return path.replace('../public/', '');
  }
};
