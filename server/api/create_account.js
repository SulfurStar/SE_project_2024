import { Readable } from 'stream';
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError } from 'h3';
import multer from 'multer';
import csv from 'csv-parser';

const prisma = new PrismaClient();
const upload = multer();

export default defineEventHandler(async (event) => {
  try {
    // 使用 multer 來處理文件上傳
    const form = await new Promise((resolve, reject) => {
      upload.single('file')(event.req, event.res, (err) => {
        if (err) return reject(err);
        resolve(event.req.file);
      });
    });

    // 如果沒有上傳文件，拋出錯誤
    if (!form) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded',
      });
    }

    const fileBuffer = form.buffer; // 獲取文件緩衝區
    const users = await parseCSV(fileBuffer); // 解析 CSV 文件內容

    const createdUsers = [];
    for (const user of users) {
      const { email, name, role } = user;

      // 檢查用戶是否已存在
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // 如果用戶不存在，創建新用戶
      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
            role,
          },
        });
        createdUsers.push(newUser);
      }
    }

    return createdUsers; // 返回已創建的用戶數據
  } catch (error) {
    console.error('Error in create_accounts API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  } finally {
    await prisma.$disconnect(); // 確保 Prisma 連接在操作完成後關閉
  }
});

// 解析 CSV 文件的函數
const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const users = [];
    const stream = Readable.from(buffer.toString());
    stream
      .pipe(csv())
      .on('data', (data) => users.push(data))
      .on('end', () => resolve(users))
      .on('error', (error) => reject(error));
  });
};
