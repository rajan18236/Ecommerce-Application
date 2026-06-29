const isLoggedIn = async (req, res, next) => {
    const accessToken = req.cookies("accessToken");
    const refreshToken = req.cookies("refreshToken");
    if (!accessToken || !refreshToken) {
        return res.status(501).json({ message: "Session expire" })
    }
    jwt.verify(accessToken, process.env.JWT_KEY, function (err, decoded) {
        if (err) {
            res.status(500).json({ message: 'something went wrong' })
        }
    });
}