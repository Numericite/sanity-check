import { Flex, List, Text } from "@chakra-ui/react";
import PrivacyScoreBadge from "../ui/badge/privacy-score-badge";
import CollapsibleLayout from "../ui/collapsible/collapsible-layout";

type Item = {
	buttonContent: React.ReactNode;
	content: React.ReactNode;
};

const scores: Item[] = [
	{
		buttonContent: (
			<>
				<Text fontSize={16} fontWeight={500}>
					Score
				</Text>
				<PrivacyScoreBadge score={"A"} />
			</>
		),
		content: (
			<>
				<Text fontSize={16} fontWeight={400}>
					L'outils :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						Ne traite pas de données à caractère personnel ou est hébergé au
						sein de l’Union européenne (ou autre pays conforme) ou permet un
						auto-hébergement
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’un DPA conforme à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Est certifié « Hébergeur de données de santé » et/ou « SecNumCloud »
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’une documentation claire, de certifications (ISO) et de
						mesures de sécurité (chiffrement).
					</List.Item>
				</List.Root>
			</>
		),
	},
	{
		buttonContent: (
			<>
				<Text fontSize={16} fontWeight={500}>
					Score
				</Text>
				<PrivacyScoreBadge score={"B"} />
			</>
		),
		content: (
			<>
				<Text fontSize={16} fontWeight={400}>
					L'outils :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						Est hébergé au sein de l’Union européenne (ou autre pays conforme)
						ou permet un hébergement des données en propre
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’un DPA conforme à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas certifié « Hébergeur de données de santé et/ou «
						SecNumCloud »
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’une documentation claire, de certifications et de mesures
						de sécurité.
					</List.Item>
				</List.Root>
			</>
		),
	},
	{
		buttonContent: (
			<>
				<Text fontSize={16} fontWeight={500}>
					Score
				</Text>
				<PrivacyScoreBadge score={"C"} />
			</>
		),
		content: (
			<>
				<Text fontSize={16} fontWeight={400}>
					L'outils :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						Est hébergé au sein de l’Union européenne (ou autre pays conforme)
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’un DPA conforme à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas certifié “Hébergeur de données de santé et/ou
						“SecNumCloud”
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’une documentation claire et de mesures de sécurité, mais
						d’aucune certification.
					</List.Item>
				</List.Root>
			</>
		),
	},
	{
		buttonContent: (
			<>
				<Text fontSize={16} fontWeight={500}>
					Score
				</Text>
				<PrivacyScoreBadge score={"D"} />
			</>
		),
		content: (
			<>
				<Text fontSize={16} fontWeight={400}>
					L'outils :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						Est hébergé au sein de l’Union européenne (ou autre pays conforme)
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’un DPA conforme à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas certifié “Hébergeur de données de santé et/ou
						“SecNumCloud”
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’une documentation claire
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Ne dispose d’aucune certification ni de mesure de sécurité.
					</List.Item>
				</List.Root>
			</>
		),
	},
	{
		buttonContent: (
			<>
				<Text fontSize={16} fontWeight={500}>
					Score
				</Text>
				<PrivacyScoreBadge score={"E"} />
			</>
		),
		content: (
			<>
				<Text fontSize={16} fontWeight={400}>
					L'outils :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas hébergé au sein de l’Union européenne (ou autre pays
						conforme)
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’un DPA conforme à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas certifié “Hébergeur de données de santé et/ou
						“SecNumCloud”
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’une documentation claire
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Ne dispose d’aucune certification ni de mesure de sécurité.
					</List.Item>
				</List.Root>
			</>
		),
	},
	{
		buttonContent: (
			<>
				<Text fontSize={16} fontWeight={500}>
					Score
				</Text>
				<PrivacyScoreBadge score={"F"} />
			</>
		),
		content: (
			<>
				<Text fontSize={16} fontWeight={400}>
					L'outils :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas hébergé au sein de l’Union européenne (ou autre pays
						conforme)
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Dispose d’un DPA conforme à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						N’est pas certifié “Hébergeur de données de santé” et/ou
						“SecNumCloud”
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Ne dispose pas d’une documentation claire
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Ne dispose d’aucune certification ni de mesure de sécurité.
					</List.Item>
				</List.Root>
			</>
		),
	},
];

const matrices: Item[] = [
	{
		buttonContent: (
			<Text fontSize={16} fontWeight={500}>
				Classification verte
			</Text>
		),
		content: (
			<Text fontSize={16} fontWeight={400}>
				L’utilisation pose peu de question de conformité, mais prévenez votre
				DPD (délégué à la protection des données) car vous devez au moins
				informer les personnes (via une politique de confidentialité ou
				notamment pour les cookies).
			</Text>
		),
	},
	{
		buttonContent: (
			<Text fontSize={16} fontWeight={500}>
				Classification orange
			</Text>
		),
		content: (
			<Text fontSize={16} fontWeight={400}>
				L’utilisation pose des questions de conformité. La mise en œuvre de
				documentations, de contractualisation ou de mesure techniques semble
				nécessaire, prévenez votre DPD, car il vous aidera à documenter et
				justifier l’utilisation de ces outils.
			</Text>
		),
	},
	{
		buttonContent: (
			<Text fontSize={16} fontWeight={500}>
				Classification rouge
			</Text>
		),
		content: (
			<Text fontSize={16} fontWeight={400}>
				L’utilisation pose de graves questions de conformité, prenez contact
				avec votre DPD.
			</Text>
		),
	},
];

export default function PrivacyScore() {
	return (
		<Flex flexDir={"column"} gap={10}>
			<Flex flexDir={"column"} gap={4}>
				<Text fontSize={20} fontWeight={500}>
					Le Privacy Score c’est quoi ?
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						Une grille de lecture proposant des critères établis à partir du
						droit et de notre approche by design du RGPD ;
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Associée à des lettres allant de A à F permettant de rendre
						immédiatement accessible la conformité de l’outil.
					</List.Item>
				</List.Root>
				<Text fontSize={16} fontWeight={400}>
					Le score affiché n’offre aucune garantie de conformité, ni de jugement
					de valeur sur les outils analysés. Nous rappelons que chaque
					responsable de traitement évalue en toute indépendance la pertinence
					et le risque de l'utilisation des outils et services numériques.
				</Text>
			</Flex>
			<Flex flexDir={"column"} gap={4}>
				<Text fontSize={20} fontWeight={500}>
					Les premiers éléments (ou critères) pris en compte pour le Privacy
					score sont :
				</Text>
				<List.Root fontSize={16} fontWeight={400} listStylePosition="inside">
					<List.Item _marker={{ color: "gray.600" }}>
						L’absence de transfert ou l’encadrement des transferts (DPF, CCT,
						BCR)
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						La conformité du DPA de l’outil à l’article 28-3 du RGPD
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						La clarté de la documentation{" "}
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Les mesures de sécurité certifiées{" "}
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Les autres mesures de sécurité{" "}
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						La certification “Hébergement de données de santé” ou “SecNumCloud”{" "}
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						La possibilité d’auto-hébergement{" "}
					</List.Item>
					<List.Item _marker={{ color: "gray.600" }}>
						Les fonctionnalités proposés par l’outil{" "}
					</List.Item>
				</List.Root>
				<Text fontSize={16} fontWeight={400}>
					Le score affiché n’offre aucune garantie de conformité, ni de jugement
					de valeur sur les outils analysés. Nous rappelons que chaque
					responsable de traitement évalue en toute indépendance la pertinence
					et le risque de l'utilisation des outils et services numériques.
				</Text>
				<Text fontSize={16} fontWeight={400}>
					Le reste des éléments qui ne sont pas mentionnés ici permettent de
					compléter ceux prioritaires et de donner plus de détail sur l’outil en
					cas d’utilisation de celui-ci.
				</Text>
				<Text fontSize={16} fontWeight={400}>
					Par ailleurs, les outils “auto-hébergés” sont classés “A” sous réserve
					que la plateforme d’hébergement du responsable de traitement soit
					respectueuse des règles sur les données à caractère personnel.
				</Text>
			</Flex>
			<Flex flexDir={"column"} gap={4}>
				<Text fontSize={20} fontWeight={500}>
					Classification
				</Text>
				{scores.map((score, index) => (
					<CollapsibleLayout
						key={`score-${index}`}
						defaultOpen={index === 0}
						item={score}
					/>
				))}
			</Flex>
			<Flex flexDir={"column"} gap={4}>
				<Text fontSize={20} fontWeight={500}>
					Matrice d’aide au choix en fonction des traitements de données
				</Text>
				{matrices.map((matrice, index) => (
					<CollapsibleLayout
						key={`matrice-${index}`}
						defaultOpen={index === 0}
						item={matrice}
					/>
				))}
			</Flex>
		</Flex>
	);
}
