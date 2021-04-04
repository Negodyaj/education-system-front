import { Tag } from "../../interfaces/Tag";

interface TagListProps {
    tags: Tag[];
}


function TagList(props: TagListProps) {
    return (
        <>
            {
                props.tags.map(t => {
                    return (
                        <div className='tags-list-item'> {t.name}</div>
                    )
                })
            }
        </>
    )
}


export default TagList