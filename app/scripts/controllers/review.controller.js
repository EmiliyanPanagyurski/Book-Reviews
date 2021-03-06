import { commentModel } from 'comment-model';
import { handlebarsSubstr} from 'handlebars-substr';
import { htmlHandler } from 'html-handler';
import { reviewModel } from 'review-model';
import { reviewSort } from 'review-sort';
import { templateHandler } from 'template-handler';
import { uploadImg } from 'img-upload';
import { userControl } from 'user-controls';
import { validator } from 'validator';

class ReviewController {

    loadCreateReviewPage(sammy) {
        reviewModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                htmlHandler.setHtml('create-review', '#content')
                    .then(() => {
                        validator.validateReview();
                    });

            } else {
                sammy.redirect('#/home');
            }
        });
    }

    createReview(sammy) {
        const user = reviewModel.getCurrentUser();
        const date = new Date();
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        uploadImg.uploadToApi($('#image')[0].files[0])
            .then((response) => {
                const formData = {
                    author: user.displayName,
                    authorUid: user.uid,
                    image: response.data.link,
                    category: $('#category').val(),
                    title: sammy.params.title,
                    content: sammy.params.content,
                    month: months[date.getMonth()],
                    day: date.getDate(),
                    bookTitle: $('#bookTitle').val().toUpperCase()
                };

                reviewModel.create(formData);
                sammy.redirect('#/home');
            });
    }

    loadHomePage(sammy) {
        const pageSize = sammy.params.pageSize;
        const page = sammy.params.page;

        reviewModel.getAllReviews()
            .then((reviews) => {
                const countPages = Math.ceil(Object.keys(reviews).length/pageSize);
                const pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
                let sortedReviews = reviewSort.sortByDate(reviews);
                let filteredReviews = reviewSort.sortByPageAndPageSize(page, pageSize, sortedReviews);
                templateHandler.setTemplate('home.template', '#content', {reviews: filteredReviews, countPages, pageNumbers, pageSize, pagination: true});
            }).catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        const pageSize = sammy.params.pageSize;
        const page = sammy.params.page;
        const category = sammy.params.category;

        reviewModel.getReviews({prop: 'category', value: sammy.params.category})
            .then((reviews) => {
                let pagination = false;
                const countPages = Math.ceil(Object.keys(reviews).length/pageSize);
                const pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
                let sortedReviews = reviewSort.sortByDate(reviews);
                let filteredReviews = reviewSort.sortByPageAndPageSize(page, pageSize, sortedReviews);

                if(countPages > 1) {
                    pagination = true;
                }

                templateHandler.setTemplate('category.template', '#content', {reviews: filteredReviews, category, countPages, pageSize, pagination, activePage: page });
            }).catch((err) => {
                console.log(err);
            });
    }

    loadReview(sammy) {
        let review;
        let isLoged;

        reviewModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                isLoged = true;
            } else {
                isLoged = false;
            }

            return isLoged;
        });

        reviewModel.getReview(sammy.params.id)
            .then((foundReview) => {
                review = foundReview;
                review.author = review.author.toUpperCase();
                return review;
            })
            .then(() => {
                return commentModel.getComments({prop: 'review', value: review.authorUid + review.title});
            })
            .then((comments) => {
                let commentsCount = 0;

                if(comments) {
                    commentsCount = Object.keys(comments).length;
                }

                templateHandler.setTemplate('review.template', '#content', {
                    review: review,
                    comments: comments,
                    commentsCount: commentsCount,
                    isLoged: isLoged,
                    category: review.category.toLowerCase()
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    createComment(sammy) {
        let user = reviewModel.getCurrentUser();
        const date = new Date();
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const comment = {
            author: user.displayName,
            image: user.photoURL,
            content: $('#comment-box').val(),
            review: sammy.params.id,
            month: months[date.getMonth()],
            day: date.getDate()
        };

        commentModel.create(comment);
        sammy.redirect('#/home/review/' + sammy.params.id);
    }

    searchByTitle(sammy) {
        const query = $('#search-input').val();
        console.log(query);
        const page = sammy.params.page;
        const pageSize = sammy.params.pageSize;

        reviewModel.getReviews({
            prop: 'bookTitle',
            value: query
        }).then((foundReviews) => {
            console.log(foundReviews);
            let pagination = false;
            const countPages = Math.ceil(Object.keys(foundReviews).length/pageSize);
            const pageNumbers = Array.from({ length: countPages }, (v, i) => i + 1);
            let sortedReviews = reviewSort.sortByDate(foundReviews);
            let filteredReviews = reviewSort.sortByPageAndPageSize(page, pageSize, sortedReviews);

            if(countPages > 1) {
                pagination = true;
            }

            templateHandler.setTemplate('search.result.template', '#content', {reviews: filteredReviews, countPages, pageNumbers, pageSize, pagination });
        });
    }
}

const reviewController = new ReviewController();

export { reviewController };