export interface IPopup {
	type?: IPopupType;
	preload?: "markerSucces" | "markerError" | "databaseError";
	content?: string;
}

export type IPopupType = "error" | "info" | "succes";
