export function usePagination(data, page = 1, perPage = 10, sortCol = null, sortDir = null, filterHandler = null) {
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    if (filterHandler) {
        data = data.filter(filterHandler)
    }
    if (sortCol && sortDir) {
        data = data.sort((a, b) => {
            if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
            else return b[sortCol]?.localeCompare(a[sortCol]);
        })
    }
    if (data.length > 0) {
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }
    return []
}