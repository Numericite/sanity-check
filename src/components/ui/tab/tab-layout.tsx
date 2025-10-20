import { Tabs } from "@chakra-ui/react";

type Item = {
    key: string;
    value: string;
    content: React.ReactNode;
}

type Props = {
    items: Item[]
}

export default function TabLayout({ items, children }: Props){
    return (
        <Tabs.Root>
            <Tabs.List>
                {}
            </Tabs.List>
        </Tabs.Root>
    )
}