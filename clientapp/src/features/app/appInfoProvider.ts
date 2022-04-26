import { VERSION } from "@/_globals/globals";
import { uuidv4 } from "@/_utility";
import { AppInfo } from "./appInfo";

const APP_INFO_KEY = 'app-info';

class AppInfoProvider {
	private _previousInfo: AppInfo | null = null;
	private _currentInfo: AppInfo;

	get previousVersion() {
		return this._previousInfo?.version || 0
	}

	get currentVersion() {
		return this._currentInfo.version
	}

	get currentInfo() {
		return this._currentInfo;
	}

	constructor() {
		const infoJson = localStorage.getItem(APP_INFO_KEY)

		if(!infoJson) {
			this._currentInfo = this.createNewInfo()
			localStorage.setItem(APP_INFO_KEY, JSON.stringify(this._currentInfo));
			return;
		}

		const info = JSON.parse(infoJson) as AppInfo;

		this._previousInfo = info;
		this._currentInfo = info;

		if(info.version !== VERSION) {
			this._currentInfo = this.createNewInfo(info.userId);
		}

		localStorage.setItem(APP_INFO_KEY, JSON.stringify(this._currentInfo));
	}

	private createNewInfo(uuid?: string) {
		return {
			userId: uuid || uuidv4(),
			version: VERSION
		}
	}

}

const appInfoProvider = new AppInfoProvider()

export {
	appInfoProvider
}