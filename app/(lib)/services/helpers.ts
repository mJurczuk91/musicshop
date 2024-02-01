export const flattenStrapiResponse = (strapiData: any) => {
    return loopOverKeys(strapiData);
}

const loopOverKeys = (obj: any): any => {
    if (typeof obj !== 'object') return obj;
    const result = Object.create(null);
    for (let key of Object.keys(obj)) {
        if (key === '__typename') continue;
        if(Object.keys(obj[key]).includes('data') && Array.isArray(obj[key]['data'])){
            const any = obj[key]['data'] as any[];
            result[key] = any.map(i => {
                return loopOverKeys({...i.attributes, id: i.id});
            });
        } else if (Object.keys(obj[key]).includes('data')) {
            if (Object.keys(obj[key].data).includes('id')) result[key] = loopOverKeys({ ...obj[key].data.attributes, id: obj[key].data.id })
            else result[key] = loopOverKeys(obj[key].data.attributes)
        } else {
            result[key] = loopOverKeys(obj[key]);
        }
    }
    return result;
}