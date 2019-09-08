/* eslint-env node */
module.exports = function config(api) {
    api.cache(false);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: false
                }
            ],
            [
                '@babel/preset-react'
            ]
        ]
    };
};
