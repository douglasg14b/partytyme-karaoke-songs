import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { atomPlaylists } from "../playlists/recoil"

import splitbee from '@splitbee/web';
import { appInfoProvider } from "./appInfoProvider";

export function SplitbeeAnalytics() {
	const [userData, setUserData] = useState({});
	const playlists = useRecoilState(atomPlaylists)
	const effectRunning = useRef(false);

	useEffect(() => {
		if(effectRunning.current) {
			return;
		}

		effectRunning.current = true;

		const newUserData = {
			uuid: appInfoProvider.currentInfo.userId,
			playlists: JSON.stringify(playlists)
		};

		if(JSON.stringify(newUserData) !== JSON.stringify(userData)) {
		
			setUserData(newUserData);

			splitbee.user.set({
				uuid: appInfoProvider.currentInfo.userId,
				playlists: JSON.stringify(playlists)
			})
		}
		
		// Effectively prevent it from re-running for 500ms
		setTimeout(() => {
			effectRunning.current = false;
		}, 500)
		

	}, [playlists])

	return null;
}