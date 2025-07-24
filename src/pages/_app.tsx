import type { AppType } from "next/app";
import { Lexend } from "next/font/google";
import { Provider } from "~/components/ui/provider";
import { api } from "~/utils/api";

const lexend = Lexend({
	variable: "--font-lexend",
	subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<div className={lexend.className}>
			<Provider>
				<Component {...pageProps} />
			</Provider>
		</div>
	);
};

export default api.withTRPC(MyApp);
