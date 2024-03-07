module.exports = (req, res, next) => {
    try {
        res.setHeader("Content-Security-Policy", "default-src 'self';");
        res.setHeader(
            "Strict-Transport-Security",
            "max-age=32140800; includeSubDomains; preload"
        );
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "deny");
        res.setHeader("Cache-control", "no-store");
        res.setHeader("Cache-control", "no-cache");
        next();
    } catch (error) {
        next(error);
    }
};