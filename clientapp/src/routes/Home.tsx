import QRCode from "react-qr-code";
import Box from "@mui/material/Box";

export default function Home() {

    return (
		<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
			<QRCode value="https://douglasg14b.github.io/partytyme-karaoke-songs/#/songs"/>
		</Box>

    );
}