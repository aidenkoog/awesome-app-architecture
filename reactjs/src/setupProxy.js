const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * CORS (Cross-Origin Resource Sharing) handling.
 */
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