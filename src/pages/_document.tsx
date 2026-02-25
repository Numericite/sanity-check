import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="fr" suppressHydrationWarning>
			<Head>
				<meta
					name="description"
					content="Sanity Check vous aide à vérifier facilement la conformité RGPD et l’éthique des solutions numériques que vous utilisez. Analysez en quelques secondes si un site ou service respecte vos valeurs et vos données."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script
					src="https://plausible.numericite.eu/js/plausible.js"
					defer
					data-domain={process.env.NEXT_PUBLIC_PROD_URL}
				/>
			</body>
		</Html>
	);
}
