import { FC, useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";

import { IMenuItems } from "./Menu.types";

const Menu: FC = () => {
	const isLoggedIn = useSelector((state: any) => state.user.loggedIn);
	const location = useLocation();

	const [isMenuToggled, setMenuToggle] = useState<boolean>(false);
	const [isHome, setIsHome] = useState<boolean>(false);

	useEffect(() => {
		if (location.pathname === "/") return setIsHome(true);
		setIsHome(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

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
					{ name: "Logout", slug: "logout" },
				];
			return [
				{ name: "Login", slug: "" },
				{ name: "About This Project", slug: "about" },
			];
		};

		return menuItems().map((item: IMenuItems, index: number) => {
			return (
				<NavLink
					to={`/${item.slug}`}
					className={({ isActive }) =>
						`item color-white font-xxl bold ${isActive ? "selected" : ""}`
					}
					key={index}
					onClick={handleMenuToggle}
				>
					{item.name}
				</NavLink>
			);
		});
	};

	if (isHome) return null;

	return (
		<>
			<div className="menu flex-h">
				<button
					className={cn(
						"font-lg flex flex-h align-center btn-as-text",
						isMenuToggled ? "color-white bold" : "color-black"
					)}
					onClick={handleMenuToggle}
				>
					menu
					{isMenuToggled ? (
						<BiX
							className={cn(
								"menu-icon align-self-center",
								isMenuToggled ? "color-white" : "color-black"
							)}
						/>
					) : (
						<BiMenu
							className={cn(
								"menu-icon align-self-center",
								isMenuToggled ? "color-white" : "color-black"
							)}
						/>
					)}
				</button>
			</div>
			{isMenuToggled && (
				<div className="menu-overlay flex flex-h all-center">
					{getMenuItems()}
				</div>
			)}
		</>
	);
};

export default Menu;
