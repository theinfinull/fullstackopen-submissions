import _ from "lodash";

export function getTotalLikes(blogs) {
    if (!blogs || blogs.length == 0) return 0;

    return blogs.reduce((totalLikes, blog) => {
        return (totalLikes += blog.likes);
    }, 0);
}

export function getFavouriteBlog(blogs) {
    if (!blogs || blogs.length === 0) return {};

    return blogs.reduce((favourite, blog) => (blog.likes > favourite.likes ? blog : favourite));
}

export function mostLikedAuthor(blogs) {
    if (!blogs.length) return {};

    return _.chain(blogs)
        .groupBy("author")
        .map((blogs, author) => ({
            author,
            likes: _.sumBy(blogs, "likes"),
        }))
        .maxBy("likes")
        .value();
}

export function authorWithManyBlogs(blogs) {
    if (!blogs.length) return {};

    return _.chain(blogs)
        .countBy("author")
        .entries()
        .map(([author, blogs]) => ({ author, blogs }))
        .maxBy("blogs")
        .value();
}
