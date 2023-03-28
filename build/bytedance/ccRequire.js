let moduleMap = {
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'assets/resources/index.js' () { return require('assets/resources/index.js') },
'assets/script/index.js' () { return require('assets/script/index.js') },
'assets/startscene/index.js' () { return require('assets/startscene/index.js') },
'src/scripts/main/index.js' () { return require('src/scripts/main/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};