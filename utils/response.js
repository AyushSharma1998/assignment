// utils/response.js
const sendSuccessResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        error: message
    });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
