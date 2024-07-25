const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            console.error("adminMiddleware: req.user is not set.");
            return res.status(500).json({ message: "Internal Server Error. User data not available." });
        }
        
        

        const adminRole = req.user.isadmin;

        if (adminRole === undefined) {
            console.error("adminMiddleware: req.user.isAdmin is undefined.");
        } else if (!adminRole) {
            console.log("adminMiddleware: User is not an admin.");
            return res.status(403).json({ message: "You are not authorized to access this route." });
        }

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("adminMiddleware error:", error);
        next(error); // Pass any errors to the error handling middleware
    }
};

module.exports = adminMiddleware;
