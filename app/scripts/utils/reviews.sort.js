class ReviewSort {
    sortByDate(reviews) {
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        let reviewsArray = Object.keys(reviews).map(key => reviews[key]);

        let sortedReviews = reviewsArray.sort(function (a, b) {
            if (months.indexOf(a.month) > months.indexOf(b.month)) {
                return -1;
            } else if (months.indexOf(a.month) < months.indexOf(b.month)) {
                return 1;
            }

            if (a.day > b.day) {
                return -1;
            } else if (a.day < b.day) {
                return 1;
            }

            return 0;
        });

        return sortedReviews;
    }

    sortByPageAndPageSize(page, pageSize, reviews) {
        let filteredReviews = [];
        let length = Object.keys(reviews).length;

        if(pageSize > length) {
            pageSize = length;
        }

        for(let i = (page - 1)*pageSize; i < page*pageSize; i++) {
            if( i < length) {
                filteredReviews.push(reviews[Object.keys(reviews)[i]]);
            }
        }

        return filteredReviews;
    }
}

const reviewSort = new ReviewSort();

export { reviewSort };