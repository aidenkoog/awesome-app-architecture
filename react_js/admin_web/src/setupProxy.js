const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '...',
        createProxyMiddleware({
            target: '...',
            changeOrigin: true,
        })
    )

    app.use(
        '...',
        createProxyMiddleware({
            target: '...',
            changeOrigin: true,
        })
    )

    app.use(
        '...',
        createProxyMiddleware({
            target: '...',
            changeOrigin: true,
        })
    )
}