import {requestFactory} from "./requester";

const rootUrl = 'http://localhost:3030/data/books';

export const bookServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(rootUrl);
        const books = Object.values(result);
        return books;
    }

    const create = async (bookData) => {
        const result = await request.post(rootUrl, bookData);

        return result;
    }

    const getOne = async (bookId) => {
        const result = await request.get(`${rootUrl}/${bookId}`);

        return result;
    }

    const getAllmyBooks = async (userId) => {
        const query = encodeURIComponent(`_ownerId="${userId}"`);
        const result = await request.get(`${rootUrl}?where=${query}`);
        const myBooks = Object.values(result);

        return myBooks;
    }

    const edit = async (bookData, bookId) => {
        const newUrl = rootUrl + `/${bookId}`;
        const result = await request.put(newUrl, bookData);

        return result;
    }

    const remove = async (bookId) => {
        const newUrl = rootUrl + `/${bookId}`;
        await request.del(newUrl);
    }

   return {
    getAll,
    getOne,
    create,
    edit,
    remove, 
    getAllmyBooks,
   }
}