import { Flex, Text, chakra } from "@chakra-ui/react";

type Glossary = {
	word: string;
	definition: string;
};

const glossaries: Glossary[] = [
	{
		word: "Privacy score",
		definition: "voir la grille de lecture du Privacy score",
	},
	{
		word: "Type d’outil",
		definition:
			"description de l’outil en fonction de son objet (hébergeur/ emailing, messagerie collaborative, support, CRM, web design etc.)",
	},
	{
		word: "Localisation de l’entreprise",
		definition:
			"pays où se situe le siège de l’entreprise. Si le siège de l’entreprise se situe en dehors de l’Union européenne, le RGPD est applicable dès lors que son activité cible des citoyens européens.",
	},
	{
		word: "Auto-hébergement",
		definition:
			"les données sont auto-hébergées lorsqu’elles sont stockées sur vos propres serveurs ou ordinateurs !",
	},
	{
		word: "Transfert hors EU",
		definition:
			"il s’agit d’identifier si les données circulent uniquement au sein de l’Union européenne ou si elles sont traitées en dehors de l’Union européenne (par exemple, si elles sont hébergées dans un pays hors Union européenne)",
	},
	{
		word: "Encadrement des transferts",
		definition:
			"dès lors que l’utilisation de l’outil implique un transfert de données à caractère personnel, il convient de s’assurer que ce transfert est conforme au RGPD et donc encadré par une décision d’adéquation, des clauses contractuelles types, des règles internes d’entreprises ou des clauses contractuelles spécifiques, un code de conduite, un mécanisme de certification approuvé, un arrangement administratif.",
	},
	{
		word: "Accès aux données",
		definition:
			"les personnes ayant accès aux données (le responsable de traitement, les employés, les partenaires, les sous-traitants ultérieurs, les filiales, la personne qui utilise l’outil)",
	},
	{
		word: "Sous-traitants ultérieurs (support/hébergement)",
		definition:
			"les personnes qui agissent selon les instructions du sous-traitant initial et qui stockent vos données par exemple",
	},
	{
		word: "DPA",
		definition:
			"dit Data Processing Agreement, prévu par l’article 28 du RGPD, il s’agit de l’accord entre le responsable de traitement et le sous-traitant (l’entreprise qui propose l’outil). Cet accord précise",
	},
	{
		word: "Certifications et normes de l’entreprise ou des sous-traitants ultérieurs",
		definition:
			"afin de standardiser les pratiques et d’assurer un niveau de protection élevé des données, des certifications et normes ont été mises en place. Il y a par exemple la certification HDS ou SecNumCloud ou les normes ISO.",
	},
	{
		word: "Fonctionnalités RGPD-Sécurité",
		definition:
			"fonctionnalités permettant d’assurer l’exercice des droits des personnes ou pour sécuriser leurs données (anonymisation, chiffrement)",
	},
];

export default function Glossary() {
	return (
		<Flex flexDir={"column"} gap={10}>
			<Flex flexDir={"column"} gap={4}>
				{glossaries.map((glossary, index) => (
					<Text key={`glossary-${index}`} fontWeight={300} fontSize={16}>
						<chakra.span fontWeight={600}>{glossary.word} : </chakra.span>
						{glossary.definition}
					</Text>
				))}
			</Flex>
		</Flex>
	);
}
