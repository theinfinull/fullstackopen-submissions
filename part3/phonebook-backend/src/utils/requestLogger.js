export function requestLogger(req, res, next) {
    console.log(`→ ${req.method} ${req.path}`);
    if (req.body) {
        console.log(`body: \t${JSON.stringify(req.body)}`);
    }
    next();
}

export function responseLogger(req, res, next) {
    const originalJson = res.json;

    res.json = function (body) {
        res.locals.responseBody = body;
        return originalJson.call(this, body);
    };

    res.on("finish", () => {
        console.log(`← ${req.method} ${req.originalUrl} ${res.statusCode}`);
        if (res.locals.responseBody) {
            console.log(`body: \t${JSON.stringify(res.locals.responseBody)}`);
        }
    });
    next();
}
