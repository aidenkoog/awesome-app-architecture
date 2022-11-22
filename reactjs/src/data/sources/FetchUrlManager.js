
const FetchApi = () => {

    fetchApi = (keyword) => {
        const url = `https://api.github.com/search/repositories?q=${keyword}`;
        fetch(url)
            .then(response => response.json())
            .then(responseData => { setData(responseData.items); });
    }

    return (
        fetchApi
    )
}

export default FetchApi