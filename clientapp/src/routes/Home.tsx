import Box from "@mui/material/Box";

import Attribution from "@/components/Attribution";


export default function Home() {

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
			<Attribution />

			<Box sx={{ flex: 1 }} />

			<Box sx={{ my: 2, mb: 8, mx: 4 }}>
				<img src={require('@/assets/qr-code.png')} alt="qr code" style={{width: '80vw'}} />
				{/* <QRCode level="L" value="https://douglasg14b.github.io/partytyme-karaoke-songs/#/songs" /> */}
			</Box>

		</Box>

	);
}