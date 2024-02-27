export const flattenStrapiResponse = (strapiData: any) => {
    return loopOverKeys(strapiData);
}

const loopOverKeys = (obj: any): any => {
    if (typeof obj !== 'object') return obj;
    const result = Object.create({});
    for (let key of Object.keys(obj)) {
        if (key === '__typename') continue;
        
        if(obj[key]?.data){
            if(Array.isArray(obj[key].data)){
                const array = obj[key].data as any[];
                result[key] = array.map(i => {
                    if(Object.keys(i).includes('id')){
                        return loopOverKeys({...i.attributes, id: i.id});
                    } else return loopOverKeys({...i.attributes});
                });
            } else if (Object.keys(obj[key].data).includes('id')) {
                result[key] = loopOverKeys({ ...obj[key].data.attributes, id: obj[key].data.id })
            } else {
                result[key] = loopOverKeys(obj[key].data.attributes)
            }
        } else {
            result[key] = loopOverKeys(obj[key]);
        }
    }
    return result;
}