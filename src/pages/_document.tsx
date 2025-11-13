import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="fr" suppressHydrationWarning>
			<Head>
				<title>Sanity Check</title>
				<meta
					name="description"
					content="Sanity Check vous aide à vérifier facilement la conformité RGPD et l’éthique des solutions numériques que vous utilisez. Analysez en quelques secondes si un site ou service respecte vos valeurs et vos données."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
