function myAjax({ type = 'get', url, data = {} }) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type,
            url,
            data,
            xhrFields: {
                withCredentials: true
            },
            success: function(response) {
                if (response.result) {
                    let {
                        result: {
                            data
                        }
                    } = response;
                    resolve(data)
                } else {
                    resolve(response)
                }


            }

        })
    })
}