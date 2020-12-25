const webpackConfig = require('@vue/cli-service/webpack.config.js')
module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            'test/**/*.spec.js' //tests目录下，所有.spce.js结尾的测试文件
        ],
        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        browsers: ['ChromeHeadless'],
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}