import {
	Button,
	createListCollection,
	Field,
	Flex,
	Grid,
	GridItem,
	Input,
	Portal,
	Select,
	Text,
	Textarea,
	type ListCollection,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckDoubleIcon, SendIcon } from "~/components/ui/icon/icons";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	contactSubmissionSchema,
	type contactSubmissionFormData,
} from "~/schemas/contact-submission";
import NextLink from "next/link";

export default function Contact() {
	const [success, setSuccess] = useState(false);
	const [collection, setCollection] = useState<ListCollection>(
		createListCollection({
			items: [{ label: "Chargement", value: 1 }],
		}),
	);
	const { data: categories, isLoading: isLoadingCategories } =
		api.category.getList.useQuery({
			limit: 0,
			sort: ["name"],
		});

	const mutation = api.contactSubmission.create.useMutation({
		onSuccess: () => {
			setSuccess(true);
		},
	});

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<contactSubmissionFormData>({
		defaultValues: {
			category: undefined,
			name: "",
			url: "",
			comment: "",
		},
		resolver: zodResolver(contactSubmissionSchema),
	});

	const category = watch("category");

	const onSubmit = ({
		category,
		name,
		url,
		comment,
	}: contactSubmissionFormData) => {
		if (!success) {
			mutation.mutate({
				category,
				name,
				url,
				comment,
			});
		}
	};

	useEffect(() => {
		if (!isLoadingCategories && categories) {
			const items = createListCollection({
				items: categories.map((category) => ({
					value: category.id,
					label: category.name,
				})),
			});
			setCollection(items);
		}
	}, [categories, isLoadingCategories]);

	return (
		<Flex gap={6} flexDir={"column"}>
			<Text fontSize={30} fontWeight={500}>
				Formulaire de contact
			</Text>
			{success ? (
				<Flex
					as={"form"}
					flexDir="column"
					h="full"
					backgroundColor={"white"}
					p={10}
					gap={5}
					rounded={"3xl"}
					borderWidth={1}
					borderColor={"gray.100"}
				>
					<Flex flexDir={"column"} gap={5}>
						<CheckDoubleIcon color={"green.600"} h={20} w={20} />
						<Text fontSize={20} fontWeight={500}>
							Merci pour votre contribution !
						</Text>
						<Text fontSize={16} fontWeight={400} color={"gray.800"}>
							Votre demande sera traitée prochainement
						</Text>
						<Flex>
							<Button colorPalette={"primary"}>
								<NextLink href={"/"}>Retour au site</NextLink>
							</Button>
						</Flex>
					</Flex>
				</Flex>
			) : (
				<Flex
					as={"form"}
					flexDir="column"
					h="full"
					backgroundColor={"white"}
					p={10}
					gap={5}
					rounded={"3xl"}
					borderWidth={1}
					borderColor={"gray.100"}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Flex flexDir={"column"} gap={5}>
						<Text fontSize={20} fontWeight={500}>
							Un outil manque ?
						</Text>
						<Text fontSize={16} fontWeight={400} color={"gray.800"}>
							Vous avez remarqué qu’un outil manque sur notre site ? Nous sommes
							toujours à la recherche de nouvelles ressources pour enrichir
							notre bibliothèque. N’hésitez pas à nous envoyer vos suggestions
							via ce formulaire, et nous ferons de notre mieux pour l’ajouter
							rapidement !
						</Text>
					</Flex>
					<Grid
						templateColumns={{
							base: "1fr",
							sm: "repeat(2, 1fr)",
						}}
						gap={10}
					>
						<GridItem>
							<Field.Root invalid={!!errors.category} gap={3}>
								<Field.Label gap={1} color={"primary.solid"}>
									Catégorie d'outil
									<Field.RequiredIndicator />
								</Field.Label>
								<Select.Root
									collection={collection}
									size="sm"
									onValueChange={(e) => setValue("category", Number(e.value))}
								>
									<Select.HiddenSelect />
									<Select.Control>
										<Select.Trigger
											rounded={"xl"}
											borderWidth={1}
											borderColor={"gray.200"}
											p={4}
											gap={2}
											value={category}
										>
											<Select.ValueText placeholder="Choisir une catégorie" />
										</Select.Trigger>
										<Select.IndicatorGroup>
											<Select.Indicator />
										</Select.IndicatorGroup>
									</Select.Control>
									<Portal>
										<Select.Positioner>
											<Select.Content
												rounded={"xl"}
												borderWidth={1}
												borderColor={"gray.200"}
												p={1.5}
												gap={1}
											>
												{collection.items.map((item) => (
													<Select.Item
														rounded={"lg"}
														px={2}
														item={item}
														key={item.value}
													>
														{item.label}
														<Select.ItemIndicator />
													</Select.Item>
												))}
											</Select.Content>
										</Select.Positioner>
									</Portal>
								</Select.Root>
								<Flex w={"full"} justifyContent={"end"}>
									<Field.ErrorText>{errors.category?.message}</Field.ErrorText>
								</Flex>
							</Field.Root>
						</GridItem>
					</Grid>
					<Grid
						templateColumns={{
							base: "1fr",
							sm: "repeat(2, 1fr)",
						}}
						gap={10}
					>
						<GridItem>
							<Field.Root invalid={!!errors.name} required gap={3}>
								<Field.Label gap={1} color={"primary.solid"}>
									Nom de l'outil
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									placeholder="Saisir le nom de l'outil"
									rounded={"xl"}
									borderWidth={1}
									borderColor={"gray.200"}
									p={4}
									gap={2}
									_focus={{
										borderColor: "gray.700",
									}}
									_invalid={{
										borderColor: "red.300",
										_focus: {
											borderColor: "red.500",
										},
									}}
									{...register("name")}
									outline={"none"}
								/>
								<Flex w={"full"} justifyContent={"end"}>
									<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
								</Flex>
							</Field.Root>
						</GridItem>

						<GridItem>
							<Field.Root invalid={!!errors.url} required gap={3}>
								<Field.Label gap={1} color={"primary.solid"}>
									Site web de l'outil
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									placeholder="Saisir l'URL du site web"
									rounded={"xl"}
									borderWidth={1}
									borderColor={"gray.200"}
									p={4}
									gap={2}
									_focus={{
										borderColor: "gray.700",
									}}
									_invalid={{
										borderColor: "red.300",
										_focus: {
											borderColor: "red.500",
										},
									}}
									{...register("url")}
									outline={"none"}
								/>
								<Flex w={"full"} justifyContent={"end"}>
									<Field.ErrorText>{errors.url?.message}</Field.ErrorText>
								</Flex>
							</Field.Root>
						</GridItem>
					</Grid>
					<Flex>
						<Field.Root invalid={!!errors.comment} gap={3}>
							<Field.Label gap={1} color={"primary.solid"}>
								Commentaire
							</Field.Label>
							<Textarea
								placeholder="Ecrire du texte"
								rounded={"xl"}
								borderWidth={1}
								borderColor={"gray.200"}
								p={4}
								gap={2}
								_focus={{
									borderColor: "gray.700",
								}}
								_invalid={{
									borderColor: "red.300",
									_focus: {
										borderColor: "red.500",
									},
								}}
								{...register("comment")}
								resize={"none"}
								outline={"none"}
							/>
							<Field.ErrorText>{errors.comment?.message}</Field.ErrorText>
						</Field.Root>
					</Flex>
					<Flex justifyContent={"end"}>
						<Button type="submit" size={"lg"} colorPalette={"primary"}>
							<Flex justifyContent={"center"} alignItems={"center"} gap={2}>
								<Text fontSize={20} fontWeight={500}>
									Envoyer
								</Text>
								<SendIcon w={6} h={6} color={"white"} />
							</Flex>
						</Button>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
}
