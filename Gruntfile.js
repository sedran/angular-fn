/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        config: {
            dist: './dist',
            dest: './dest',
            src: './src',
            js: [
                '<%= config.src %>/**/*.js',
                '!<%= config.src %>/**/*.spec.js'
            ]
        },
        
        clean: ['<%= config.dist %>/*', '<%= config.dest %>/*'],
        
        // Copy modules in src folder into dest folder
        copy: {
            files: {
                expand: true,
                cwd: 'src/',
                src: [
                    'angular-fn/**',
                    'block-ui/**'
                ],
                dest: 'dest/'
            }
        },
    
        uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'dest/angular-fn/angular-fn.min.js': ['dest/angular-fn/angular-fn.js'],
                    'dest/block-ui/block-ui.min.js': ['dest/block-ui/block-ui.js']
                }
            }
        },
        
        cssmin: {
            target: {
                files: {
                    'dest/block-ui/block-ui.min.css': ['dest/block-ui/block-ui.css']
                }
            }
        },
        
        concat: {
            normal_and_minified: {
                files: {
                    'dist/angular-fn.js': [
                        'dest/angular-fn/angular-fn.js',
                        'dest/block-ui/block-ui.js'
                    ],
                    'dist/angular-fn.min.js': [
                        'dest/angular-fn/angular-fn.min.js',
                        'dest/block-ui/block-ui.min.js'
                    ],
                    'dist/angular-fn.css': [
                        'dest/block-ui/block-ui.css'
                    ],
                    'dist/angular-fn.min.css': [
                        'dest/block-ui/block-ui.min.css'
                    ]
                }
            }
        },
        
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    angular: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'src/**/*.js',
                        'test/**/*.js'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    // Run jshint and unit tests
    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin', 'concat', 'test']);
    
};
