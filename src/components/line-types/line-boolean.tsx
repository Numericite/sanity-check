import BooleanBadge from "../ui/badge/boolean-badge";

type Props = {
    val: boolean;
}

export default function LineBoolean({ val }: Props){
    return (
        <BooleanBadge val={val} />
    )
}