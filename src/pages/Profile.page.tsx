import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Input, Link } from "../components";
import { getUser } from "../hooks/useCredentials";

const Profile: FC = () => {
	// Get userdata here

	const { user } = getUser();
	console.log("Profile", user);

	if (!user) return <Navigate to="/" />;

	return (
		<div className="profile full-view-width-heigth grid grid-two-col grid-center">
			<div className="left">
				<div className="container image circle">
					<img src={user.image} alt="" className="full-width-height" />
				</div>
				<div className="data margin-auto grid">
					<Input label="Name" value={user.name} readOnly type="text" />
					<Input label="Email" value={user.email} readOnly type="text" />
					<Input label="New password" type="password" />
					<Input label="Confirm new password" type="password" />
				</div>
				<Link
					content="Connect with Google"
					onClick={() => console.log("GOOGLE")}
					type="google"
					extraStyle="google profile-button margin-auto"
				/>
				<Link
					content="Delete your account"
					onClick={() => console.log("GUUGLE")}
					type="delete"
					extraStyle="margin-auto margin-top-lg"
				/>
			</div>
			<div className="right"></div>
		</div>
	);
};

export default Profile;
