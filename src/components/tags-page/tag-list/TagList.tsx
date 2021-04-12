import { Tag } from "../../interfaces/Tag";

interface TagListProps {
    tags: Tag[]|undefined;
    str: string;
}


function TagList(props: TagListProps) {
    return (
        <>
            {
                props.tags?.map((item) => { 
                    if (item.name.toLowerCase().includes(props.str.toLowerCase())) {
                        return ( <div> {item.name} </div> )
                    }
                })
            }
        </>
    )
}


export default TagList