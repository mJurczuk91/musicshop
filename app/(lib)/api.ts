const get = async (url: string): Promise<Response> => {
    const resp = await fetch(url);
    _handleResponse(resp);
    return resp;
}

const _handleResponse = (resp: Response) => {
    if (!resp.ok) throw new Error(`Request failed with code ${resp.status}`);
}

const api = { get };
export default api;