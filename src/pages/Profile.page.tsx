import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { Input, Link, Loading, Setting } from "../components";
import fallbackImage from "../assets/fallback.png";
import { deleteSignedUser } from "../hooks/useCredentials";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile: FC = () => {
	const navigate = useNavigate();
	const user = useSelector((store: any) => store.user.userData);

	const formRef = useRef<HTMLFormElement>(null);
	const [deleteSafety, setDeleteSafety] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);
	const profileImage = user.image || fallbackImage;

	const settings = [
		{
			title: "Profile visibility",
			content:
				"Allow other people to find your profile by searching for it in the app.",
			enabled: true,
		},
		{
			title: "Display profile picture",
			content: "Allow other people to view your profile picture.",
			enabled: false,
		},
		{
			title: "Default route publish",
			content:
				"Toggle wether other people can find, use and share your routes by default. This can be set for each route individually. This will only affect new routes.",
			enabled: true,
		},
		{
			title: "Profile visibility",
			content:
				"Allow other people to find your profile by searching for it in the app.",
			enabled: true,
		},
		{
			title: "Data analysation",
			content: "Personalised routes recommended to you by our AI.",
			enabled: false,
		},
	];

	const renderSettings = (): JSX.Element[] => {
		return settings.map((el: any) => {
			return (
				<Setting
					title={el.title}
					content={el.content}
					defaultValue={el.enabled}
				/>
			);
		});
	};

	const handleDeleteAccount = () => {
		if (!deleteSafety) {
			setDeleteSafety(true);
			setTimeout(() => setDeleteSafety(false), 15000);
			return;
		}
		formRef.current &&
			formRef.current.dispatchEvent(
				new Event("submit", { cancelable: true, bubbles: true })
			);
	};

	const handleDeleteForm = async (e: any) => {
		e.preventDefault();
		setDeleting(true);
		const { error } = await deleteSignedUser(e.target[0].value);
		if (error) {
			toast.error("The account has not been deleted.");
			toast.error("The password is incorrect.");
			setDeleting(false);
			return;
		}
		setDeleting(false);
		// navigate("/", { replace: true });
	};

	return (
		<div className="profile full-view-width-heigth grid grid-two-col grid-center">
			<div className="left">
				<div className="container image circle">
					<img src={profileImage} alt="" className="full-width-height" />
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
				{deleteSafety && !deleting && (
					<form
						onSubmit={handleDeleteForm}
						className="deleteForm margin-top-lg margin-auto"
						ref={formRef}
					>
						<Input
							label="Please enter your password"
							type="password"
							onSubmit={handleDeleteForm}
							extraStyle="deleteInput"
						/>
					</form>
				)}
				{!deleting ? (
					<Link
						content={
							deleteSafety
								? "Are you sure? This is irreversible!"
								: "Delete your account"
						}
						onClick={handleDeleteAccount}
						type="delete"
						extraStyle={cn(
							"margin-auto",
							deleteSafety ? "color-red margin-top-sm" : "margin-top-lg"
						)}
					/>
				) : (
					<div className="loading margin-top-lg">
						<Loading />
					</div>
				)}
			</div>
			<div className="right full-width-height">{renderSettings()}</div>
		</div>
	);
};

export default Profile;
