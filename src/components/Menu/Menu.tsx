import { FC, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { batch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { Logout } from "..";
import { IMenuItems } from "./Menu.types";

const Menu: FC = () => {
	const isLoggedIn = useSelector((state: any) => state.user.loggedIn);

	const [isMenuToggled, setMenuToggle] = useState<boolean>(false);
	const [logout, setLogout] = useState<boolean>(false);

	const handleMenuToggle = () => {
		setMenuToggle(!isMenuToggled);
	};

	const getMenuItems = () => {
		const menuItems = (): IMenuItems[] => {
			if (isLoggedIn)
				return [
					{ name: "Profile", slug: "profile" },
					{ name: "Map", slug: "map" },
					{ name: "About This Project", slug: "about" },
					{ name: "How To Use", slug: "guide" },
					{ name: "Logout", slug: "logout" },
				];
			return [
				{ name: "Login", slug: "" },
				{ name: "About This Project", slug: "about" },
				{ name: "How To Use", slug: "guide" },
			];
		};

		return menuItems().map((item: IMenuItems, index: number) => {
			if (item.slug === "logout")
				return (
					<button
						className="btn-as-text item color-white font-xl bold pointer"
						onClick={() =>
							batch(() => {
								setLogout(true);
								setMenuToggle(false);
							})
						}
						key="logout"
					>
						Logout
					</button>
				);
			return (
				<NavLink
					to={`/${item.slug}`}
					className={({ isActive }) =>
						`item color-white font-xl bold ${isActive ? "selected" : ""}`
					}
					key={index}
					onClick={handleMenuToggle}
				>
					{item.name}
				</NavLink>
			);
		});
	};

	return (
		<>
			<div className="menu flex-h">
				<button
					className="font-lg flex flex-h align-center btn-as-text color-white bold"
					onClick={handleMenuToggle}
				>
					menu
					<BiMenu className="menu-icon align-self-center" />
				</button>
			</div>
			{isMenuToggled && (
				<div className="menu-overlay flex flex-h all-center">
					{getMenuItems()}
				</div>
			)}
			{logout && <Logout />}
		</>
	);
};

export default Menu;
