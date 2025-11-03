import { Button, Drawer } from "@chakra-ui/react";

export default function CategoryDrawer() {
	return (
		<Drawer.Root>
			<Drawer.Backdrop />
			<Drawer.Trigger asChild>
				<Button variant={"outline"}>En savoir plus</Button>
			</Drawer.Trigger>
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.CloseTrigger />
					<Drawer.Header>
						<Drawer.Title />
					</Drawer.Header>
					<Drawer.Body />
					<Drawer.Footer />
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
}
