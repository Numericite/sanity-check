import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="fr" suppressHydrationWarning>
			<Head>
				<meta
					name="description"
					content="Sanity Check vous aide à vérifier facilement la conformité RGPD et l’éthique des solutions numériques que vous utilisez. Analysez en quelques secondes si un site ou service respecte vos valeurs et vos données."
				/>
				<link rel="icon" href="/favicon.ico" />
				<script
					type="text/javascript"
					src="/static/tarteaucitron/tarteaucitron.js"
				/>
				{process.env.NEXT_PUBLIC_ENV_APP === "production" && (
					<script type="text/javascript" src="/static/tarteaucitron/init.js" />
				)}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
