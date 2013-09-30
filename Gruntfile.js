module.exports = function(grunt) {

  grunt.initConfig({
    transport: {
      cmd: {
        files: [
          {
            cwd: 'src/scripts',
            src: '**/*.js',
            dest: 'src/scripts_build'
          }
        ]
      }
    },
    concat: {
      cmd: {
        options: {
          include: 'relative'
        },
        files: [
          {
            expand: true,
            cwd: 'src/scripts_build',
            src: 'pages/*.js',
            filter: function(filepath){
              return filepath.indexOf('-debug') == -1;
            },
            dest: 'dist/scripts'
          }
        ] 
      }
    },
    uglify: {
      scripts: {
        files: [
          {
            expand: true,
            cwd: 'dist/scripts/pages',
            src: '*.js',
            dest: 'dist/scripts/pages'
          }
        ]
      }
    },
    copy: {
      items: {
        files: [
          {expand: true, cwd: 'src', src: ['html/**/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src', src: ['scripts/libs/**/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src', src: ['styles/img/**/*'], dest: 'dist/', filter: 'isFile'},
        ]
      }
    },
    less: {
      tocss: {
        options: {
          // compress: true
          yuicompress: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['styles/*.less'],
          dest: 'dist',
          ext: '.css',
          filter: function(filename) {
            return filename.indexOf('page-') >= 0
          }
        }]
      }
    },
    clean: {
      build: ['src/scripts_build']
    }
  })

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['transport', 'concat', 'uglify', 'copy', 'less', 'clean']);
}