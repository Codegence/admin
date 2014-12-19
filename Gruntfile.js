/*
    Copyright (C) 2014  Gaston Kaltner
    This file is part of Codegence.
    Codegence is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    Codegence is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with Codegence. If not, see <http://www.gnu.org/licenses/>.
 */
module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                options: {
                    banner: ''
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/public/js',
                        src: '**/*.js',
                        dest: 'build/public/js'
                    }
                ]
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            codegence: {
                src: ['public/js/services/*', 'public/js/controllers/*', 'public/js/directives/*', 'public/js/models/*', 'public/js/models/*']
            }
        },
        copy: {
           main:{
               files: [
                   {expand: true, src: ['public/**'], dest: 'build/'}
               ]
           }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['ngAnnotate','copy','uglify']);

};