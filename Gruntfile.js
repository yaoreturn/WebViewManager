module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      tocss: {
        options: {
          // compress: true
          yuicompress: true
        },
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.less'],
          dest: 'styles',
          ext: '.css',
          filter: function(filename) {
            return filename.indexOf('page-') >= 0
          }
        }]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less']);
}