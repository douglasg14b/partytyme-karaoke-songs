import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Attribution from "@/components/Attribution";


export default function Home() {

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
			<Attribution />

			<Box sx={{mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				Best Viewed on Mobile
				<Typography variant="caption" sx={{fontSize: 12}}>
					(Really tho, not meant for desktop)
				</Typography>
			</Box>

			<Box sx={{ flex: 1 }} />

			<Box sx={{ my: 2, mb: 8, mx: 4 }}>
				<img src={require('@/assets/qr-code.png')} alt="qr code" style={{ width: '80vw', maxWidth: '600px' }} />
				{/* <QRCode level="L" value="https://douglasg14b.github.io/partytyme-karaoke-songs/#/songs" /> */}
			</Box>

		</Box>

	);
}