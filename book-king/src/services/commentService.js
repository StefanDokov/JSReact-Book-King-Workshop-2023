import { requestFactory } from "./requester";

const rootUrl = 'http://localhost:3030/data/comments';

export const commentFactory = () => {
    const request = requestFactory();

    const getAll = async (bookId) => {
        const query = encodeURIComponent(`bookId="${bookId}"`);
        const result = await request.get(`${rootUrl}?where=${query}`);
        const comments = Object.values(result);

        return comments;
    };

    const create = async (bookId, comment, username) => {
        const result = await request.post(rootUrl, { bookId, comment, username });

        return result;
    }

    return {
        getAll,
        create
    }

}