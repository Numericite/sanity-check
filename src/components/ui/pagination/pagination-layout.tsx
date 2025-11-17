import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
	page: number;
	setPage: (val: number) => void;
	count: number;
	numberPerPage?: number;
};

export default function PaginationLayout({
	page,
	setPage,
	count,
	numberPerPage = 10,
}: Props) {
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
