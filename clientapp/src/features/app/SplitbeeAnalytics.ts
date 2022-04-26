import { useEffect, useRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { atomPlaylists } from "../playlists/recoil"

import splitbee from '@splitbee/web';
import { appInfoProvider } from "./appInfoProvider";


const useUsers = false;

export function SplitbeeAnalytics() {
	const [userData, setUserData] = useState({});
	const playlists = useRecoilValue(atomPlaylists)
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

		const totalSongs = playlists.reduce((num, value, index, arr) => {
			 return num + value.songs.length 
		}, 0)

		if(useUsers && JSON.stringify(newUserData) !== JSON.stringify(userData) && totalSongs > 1) {
		
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