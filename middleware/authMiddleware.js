const protect = (req, res, next) => {
    const { user } = req.session
    const session = req.session

    console.log('middleware', req.session)
    console.log('session ---------', session)

    if (!user) {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' })
    }

    req.user = user

    next()
};

module.exports = protect