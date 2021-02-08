/* module.exports = {
    ...require('./user'),
    ...require('./poll')
}; */

export * from './user.js';
export * from './poll.js';

export const notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 400;

    next(err);
}

export const errors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong'
    });
};
