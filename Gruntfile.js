module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      dist: {
        files: {
          "dist/css/styles.css": "src/scss/styles.scss",
        },
      },
    },

    uglify: {
      options: {},
      my_target: {
        files: {
          "dist/js/script.js": ["src/js/script.js"],
        },
      },
    },
    copy: {
      main: {
        expand: true,
        cwd: "src/",
        src: "index.html",
        dest: "dist/",
      },
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "dist/css",
            src: ["*.css", "!*.min.css"],
            dest: "dist/css",
            ext: ".min.css",
          },
        ],
      },
    },

    watch: {
      scripts: {
        files: ["src/js/*.js", "src/scss/*.scss", "src/*.html"],
        tasks: ["uglify", "sass", "copy", "cssmin"],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("default", ["uglify", "sass", "copy", "cssmin", "watch"]);
  grunt.registerTask("build", ["uglify", "sass", "copy", "cssmin"]);
};
