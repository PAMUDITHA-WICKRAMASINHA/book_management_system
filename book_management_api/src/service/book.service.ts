import bookModel from "../models/book.model";
import userModel from "../models/user.model";
import * as bookRepo from "../repository/book.repo";

export const bookCreate = async ({title, author, publication_year, genre}, user_id) => {
    let data = {error: false, message: ""}

    try{
        const userData = await userModel.findOne({user_id: user_id});
        if(!userData){
            data = {error: true, message: "user not found"}
            return data;
        }

        await bookRepo.bookCreate({title, author, publication_year, genre, user_id});
        data = {error: false, message: "book create sucess"}
        return data;
    }catch(error){
        console.log(error);
        data = {error: true, message: "something went wrong"}
        return data;
    }
};

export const bookGet = async ({title, author, genre, page_number, row_pre_page}, user_id) => {
    let data = {error: false, message: ""}

    try{
        const skipValue = (page_number - 1) * row_pre_page || 0;
        const userData = await userModel.findOne({user_id: user_id});
        if(!userData){
            data = {error: true, message: "user not found"}
            return data;
        }

        const pipeline = [];

        if (title && title !== '') {
            pipeline.push({
                $match: {
                    title: { $regex: title }
                }
            });
        }
        
        if (author && author !== '') {
            pipeline.push({
                $match: {
                    author: { $regex: author }
                }
            });
        }
        
        if (genre && genre !== '') {
            pipeline.push({
                $match: {
                    genre: { $regex: genre }
                }
            });
        }
        
        const pipeline_lv2 = [];      
        pipeline_lv2.push({ $sort: { created_at: -1 } });
        pipeline_lv2.push({ $skip: Number(skipValue) });

        const rowPrePage = Number(row_pre_page);
        if (rowPrePage && rowPrePage > 0) {
            pipeline_lv2.push({ $limit: rowPrePage });
        }

        pipeline.push({
            $facet: {
                paginatedData: pipeline_lv2,
                totalCount: [{ $count: 'total' }]
            }
        });
        
        const result = await bookModel.aggregate(pipeline);        
        const paginatedData = result[0].paginatedData;
        const totalCount = result[0].totalCount[0]?.total || 0;
        if (paginatedData.length > 0) {
            const data = {
                error: false,
                message: 'book data fetch success',
                data: paginatedData,
                tableCount: totalCount,
            };
            return data;
        } else {
            const data = {
                error: false,
                message: 'book data not found',
                data: [],
                tableCount: 0,
            };
            return data;
        }
    }catch(error){
        console.log(error);
        data = {error: true, message: "something went wrong"}
        return data;
    }
};

export const bookUpdate = async ({ book_id, title, author, genre, publication_year }) => {
    let data = { error: false, message: "" };

    try {
        const updatedBook = await bookModel.findOneAndUpdate(
            { book_id: book_id },
            { title, author, genre, publication_year }
        );

        if (!updatedBook) {
            data = { error: true, message: "Book not found" };
        } else {
            data = { error: false, message: "Book updated success" };
        }
        return data;
    } catch (error) {
        console.log(error);
        data = { error: true, message: "Something went wrong" };
    }

    return data;
};

export const bookDelete = async ({book_id}) => {
    let data = { error: false, message: "" };

    try {
        const deletedBook = await bookModel.findOneAndDelete({ book_id: book_id });

        if (!deletedBook) {
            data = { error: true, message: "Book not found" };
        } else {
            data = { error: false, message: "Book deleted success" };
        }
        return data;
    } catch (error) {
        console.log(error);
        data = { error: true, message: "Something went wrong" };
    }

    return data;
};