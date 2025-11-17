import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
	page: number;
	setPage: (val: number) => void;
	count: number;
	isLoading: boolean;
	numberPerPage?: number;
};

export default function PaginationLayout({
	page,
	setPage,
	count,
	isLoading,
	numberPerPage = 10,
}: Props) {
	useEffect(() => {
		const totalPages = Math.max(1, Math.ceil(count / numberPerPage));
		if (page > totalPages && !isLoading) {
			setPage(1);
		}
	}, [count, numberPerPage, page, setPage, isLoading]);

	if (count < numberPerPage) return null;

	return (
		<Pagination.Root
			count={count}
			pageSize={numberPerPage}
			page={page}
			onPageChange={(e) => setPage(e.page)}
			siblingCount={3}
		>
			<ButtonGroup variant="ghost" size="sm">
				<Pagination.PrevTrigger asChild>
					<IconButton colorPalette={"blue"}>
						<FaChevronLeft />
					</IconButton>
				</Pagination.PrevTrigger>

				<Pagination.Items
					render={(page) => (
						<IconButton
							colorPalette={"blue"}
							variant={{ base: "ghost", _selected: "solid" }}
						>
							{page.value}
						</IconButton>
					)}
				/>

				<Pagination.NextTrigger asChild>
					<IconButton colorPalette={"blue"}>
						<FaChevronRight />
					</IconButton>
				</Pagination.NextTrigger>
			</ButtonGroup>
		</Pagination.Root>
	);
}
