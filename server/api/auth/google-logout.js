import { defineEventHandler, deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
    await deleteCookie(event, 'auth_token');// 刪除 cookie
    

    return {
        success: true,
        message: 'Logged out successfully',
    };
});