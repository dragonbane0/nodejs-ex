const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const corsProxy = require('cors-anywhere');

const testMode = false;

const protocol = testMode ? 'http' : 'https';
const allowHTTP = false;
const host = testMode ? "localhost" : process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const baseURL = testMode ? "localhost" : 'openshift.com';

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

function corsProxyServer() {
    console.log('[CorsProxy] Starting server');

    return corsProxy.createServer({
        originWhitelist: [], //Allow all origins
        requireHeader: [],
        removeHeaders: ['origin', 'referer'],
        redirectSameOrigin: true,
        httpProxyOptions: {
            //Do not add X-Forwarded-For, etc. headers
            xfwd: false
        },
        spoofOrigin: true
    }).listen(port, host, function () {
        console.log('[CorsProxy] Running CORS Anywhere on ' + host + ':' + port);
    });
}
   
module.exports = corsProxyServer();
