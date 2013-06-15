var semver = require('semver'),
    f = require('util').format,
    jsFiles = [
      'src/version.js',
      'src/bootstrap-limit.js'
    ];

module.exports = function(grunt) {
  grunt.initConfig({
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*!',
      ' * bootstrap-limit.js <%= version %>',
      ' * https://github.com/trongrg/bootstrap-limit',
      ' * Copyright 2013 TrongTran and other contributors; Licensed MIT',
      ' */\n\n'
    ].join('\n'),

    concat: {
      js: {
        src: ['src/intro.js', jsFiles, 'src/outro.js'],
        dest: '<%= buildDir %>/bootstrap-limit.js'
      },
      jsmin: {
        src: ['src/intro.js', jsFiles, 'src/outro.js'],
        dest: '<%= buildDir %>/bootstrap-limit.min.js'
      }
    },

    sed: {
      version: {
        pattern: '%VERSION%',
        replacement: '<%= version %>',
        path: ['<%= concat.js.dest %>', '<%= concat.jsmin.dest %>']
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        src: '<%= concat.js.dest %>',
        dest: '<%= concat.js.dest %>'
      },
      jsmin: {
        options: {
          mangle: true,
          compress: true
        },
        src: '<%= concat.jsmin.dest %>',
        dest: '<%= concat.jsmin.dest %>'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: jsFiles,
      tests: ['test/*.js'],
      gruntfile: ['Gruntfile.js']
    },

    watch: {
      js: {
        files: jsFiles,
        tasks: 'build:js'
      }
    },

    jasmine: {
      js: {
        src: jsFiles,
        options: {
          specs: 'test/*_spec.js',
          helpers: 'test/helpers/*',
          vendor: 'test/vendor/*'
        }
      }
    },

    exec: {
      open_spec_runner: {
        cmd: 'open _SpecRunner.html'
      },
      git_is_clean: {
        cmd: 'test -z "$(git status --porcelain)"'
      },
      git_on_master: {
        cmd: 'test $(git symbolic-ref --short -q HEAD) = master'
      },
      git_add: {
        cmd: 'git add .'
      },
      git_commit: {
        cmd: function(m) { return f('git commit -m "%s"', m); }
      },
      git_tag: {
        cmd: function(v) { return f('git tag v%s -am "%s"', v, v); }
      },
      git_push: {
        cmd: 'git push && git push --tags'
      },
      publish_assets: {
        cmd: [
          'cp -r <%= buildDir %> bootstrap-limit.js',
          'zip -r bootstrap-limit.js/bootstrap-limit.js.zip bootstrap-limit.js',
          'git checkout gh-pages',
          'rm -rf releases/latest',
          'cp -r bootstrap-limit.js releases/<%= version %>',
          'cp -r bootstrap-limit.js releases/latest',
          'git add releases/<%= version %> releases/latest',
          'sed -E -i "" \'s/v[0-9]+\\.[0-9]+\\.[0-9]+/v<%= version %>/\' index.html',
          'git add index.html',
          'git commit -m "Add assets for <%= version %>."',
          'git push',
          'git checkout -',
          'rm -rf bootstrap-limit.js'
        ].join(' && ')
      }
    },

    clean: {
      dist: 'dist'
    },

    connect: {
      server: {
        options: {
          port: 8888, keepalive: true
        }
      }
    },

    parallel: {
      dev: [
        { grunt: true, args: ['server'] },
        { grunt: true, args: ['watch'] }
      ]
    }
  });

  grunt.registerTask('release', 'Ship it.', function(version) {
    var curVersion = grunt.config.get('version');

    version = semver.inc(curVersion, version) || version;

    if (!semver.valid(version) || semver.lte(version, curVersion)) {
      grunt.fatal('invalid version dummy');
    }

    grunt.config.set('version', version);

    grunt.task.run([
      'exec:git_on_master',
      'exec:git_is_clean',
      'lint',
      'test',
      'manifests:' + version,
      'build',
      'exec:git_add',
      'exec:git_commit:' + version,
      'exec:git_tag:' + version,
      'exec:git_push',
      'exec:publish_assets'
    ]);
  });

  grunt.registerTask('manifests', 'Update manifests.', function(version) {
    var _ = grunt.util._,
        pkg = grunt.file.readJSON('package.json'),
        component = grunt.file.readJSON('component.json'),
        jqueryPlugin = grunt.file.readJSON('bootstrap-limit.js.jquery.json');

    component = JSON.stringify(_.extend(component, {
      name: pkg.name,
      version: version
    }), null, 2);

    jqueryPlugin = JSON.stringify(_.extend(jqueryPlugin, {
      name: pkg.name,
      title: pkg.name,
      version: version,
      author: pkg.author,
      description: pkg.description,
      keywords: pkg.keywords,
      homepage: pkg.homepage,
      bugs: pkg.bugs,
      maintainers: pkg.contributors
    }), null, 2);

    pkg = JSON.stringify(_.extend(pkg, {
      version: version
    }), null, 2);

    grunt.file.write('package.json', pkg);
    grunt.file.write('component.json', component);
    grunt.file.write('bootstrap-limit.js.jquery.json', jqueryPlugin);
  });

  // aliases
  // -------

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['concat:js', 'concat:jsmin', 'sed:version', 'uglify']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('test', 'jasmine:js');
  grunt.registerTask('test:browser', ['jasmine:js:build', 'exec:open_spec_runner']);
  grunt.registerTask('dev', 'parallel:dev');

  // load tasks
  // ----------

  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
