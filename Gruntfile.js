module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['*.json', 'Gruntfile.js', 'index.js', 'tests/*.js'],
            options: {
                globals: {
                    'jQuery': true,
                    'strict': true
                }
            }
        },
        jasmine: {
            all: {
                src: 'lib/pcache.js',
                options: {
                    specs: 'tests/*.spec.js'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'jasmine:all']);
};
