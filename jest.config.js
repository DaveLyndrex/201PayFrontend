module.exports = {
        preset: '@vue/cli-plugin-unit-jest',
        transformIgnorePatterns: ["/node_modules/(?!vuetify),(?!vue-sweetalert2)"],
        moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
        // moduleNameMapper: {
        //     "^@/(.*)$": "<rootDir>/src/$1",
        //     'vuetify/lib(.*)': '<rootDir>/node_modules/vuetify/es5$1',
        // },

    }
    // module.exports = {
    //     preset: '@vue/cli-plugin-unit-jest',
    //     "moduleFileExtensions": [
    //       "js",
    //       "json",
    //       "vue"
    //     ],
    //     transform: {
    //       '.*\\.js$':'babel-jest',
    //       ".*\\.(vue)$": "vue-jest"
    //     },
    //     moduleNameMapper: {
    //       "@/(.*)": "<rootDir>/src/$1",
    //     },
    //     testEnvironment: 'jsdom'
    //   }