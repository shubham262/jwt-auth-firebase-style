import jwt from "jsonwebtoken";
export const authCheck = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;

		if (!authorization || !authorization.startsWith("Bearer")) {
			return res.status(401).json({
				message: "Unauthorised",
			});
		}

		const token = authorization?.split(" ")?.[1];

		if (!token) {
			return res.status(401).json({
				message: "Unauthorised",
			});
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			if (!decoded) {
				return res.status(401).json({
					message: "Unauthorised",
				});
			}
			req.user = {
				userId: decoded?.userId,
				name: decoded?.name,
				email: decoded?.email,
			};

			//option db calls

			next();
		} catch (error) {
			return res.status(401).json({
				message: "Unauthorised",
			});
		}
	} catch (error) {
		console.log("authCheck", error);
		res.status(500).json({
			message: "Internal Servor error",
			error,
		});
	}
};
