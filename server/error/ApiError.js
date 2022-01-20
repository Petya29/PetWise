class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorizedError() {
        return new ApiError(401, 'You are not logged in', [{ msg: 'You are not logged in' }]);
    }

    static forbiden(message, errors = []) {
        return new ApiError(403, message, errors);
    }

    static notFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }

    static internal(message, errors = []) {
        return new ApiError(500, message, errors);
    }
}

module.exports = ApiError;