export const generateLink = ({slug, page, sort}:{slug:string, page?:string,sort?:string}):string => {
    if(slug && page && sort){
        return `/category/${slug}/${page}/${sort}`
    } else if (slug && page && !sort) {
        return `/category/${slug}/${page}`
    } else if(slug && !page && sort){
        return `/category/${slug}/${sort}`
    } else return `/category/${slug}`
}