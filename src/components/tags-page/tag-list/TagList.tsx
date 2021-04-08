import { Tag } from "../../interfaces/Tag";

interface TagListProps {
    tags: Tag[];
    str: string;
}


function TagList(props: TagListProps) {
    return (
        <div className ='pop'>
            {
                props.tags?.map((item) => { 
                    if (item.name.toLowerCase().includes(props.str.toLowerCase())) {
                        return ( <div> {item.name} </div> )
                    }
                })
            }
        </div>
    )
}


export default TagList