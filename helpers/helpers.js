const axios = require('axios')

axiosGet = async (url, params, header) => {
    return axios.get(url, { params: params }, header)
        .then(async response => {
            console.log(response.status)
            // 1. Get the total of pages 
            totalPages = response.headers['x-wp-totalpages'];
            // 2. Store the first results
            allResults = response.data;
            // 3. Map through the other pages to concat all the results from every pages
            for (let i = 2; i <= totalPages; i++) {
                let newUrl = url + "?page=" + i;

                await axios.get(newUrl, { params: { params } }, header)
                    .then(moreresults => {
                        allResults = allResults.concat(moreresults.data);
                    })
                    .catch(err => console.log(err));
            }
            console.log(allResults.length)
            return allResults
        })
        .catch(err => console.log(err))
}

axiosPost = (url, params, header) => {
    return axios.post(url, params, header)
        .then(response => {
            // 1. Get the total of pages 
            totalPages = response.headers.get('X-WP-TotalPages');
            // 2. Store the first results
            allResults = response.data;
            // 3. Map through the other pages to concat all the results from every pages
            for (let i = 2; i <= totalPages; i++) {
                axios.post(url + "?page=" + i, params, header)
                    .then(moreresults => {
                        allResults = allResults.concat(moreresults);
                    });
            }
            return allResults
        })
        .catch(err => console.log(err))
}

module.exports = {
    axiosGet,
    axiosPost
}
