import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // 打印接收到的 body 以进行调试
    console.log('Received body:', body);

    // 解构 body 并打印所有字段
    const {
        title,
        authorId,
        phone,
        noroom,
        reserve,
        rental_rm,
        buildtype,
        rm_type,
        rent_low,
        rent_high,
        deposit,
        other_fee,
        floor,
        indp_mete,
        part_mate,
        gender,
        Smoke_fre,
        identity,
        telev,
        fridge,
        aircond,
        washmch,
        clothdry,
        waterdisp,
        wardrobe,
        singlebed,
        doublebea,
        desk,
        internet,
        pub_equi,
        condition,
        heater,
        safe_faci,
        certified,
        houseAge,
        endAt,
        verify,
        address,
        images
    } = body;

    // 打印所有解构后的字段以进行调试
    console.log('Received fields:', {
        title,
        authorId,
        phone,
        noroom,
        reserve,
        rental_rm,
        buildtype,
        rm_type,
        rent_low,
        rent_high,
        deposit,
        other_fee,
        floor,
        indp_mete,
        part_mate,
        gender,
        Smoke_fre,
        identity,
        telev,
        fridge,
        aircond,
        washmch,
        clothdry,
        waterdisp,
        wardrobe,
        singlebed,
        doublebea,
        desk,
        internet,
        pub_equi,
        condition,
        heater,
        safe_faci,
        certified,
        houseAge,
        endAt,
        verify,
        address,
        images
    });

    try {
        // 确保 authorId 是一个有效的整数
        const parsedAuthorId = parseInt(authorId, 10);
        if (isNaN(parsedAuthorId)) {
            throw new TypeError('Invalid authorId');
        }

        // 确保 phone 是一个有效的整数
        const parsedPhone = parseInt(phone, 10);
        if (isNaN(parsedPhone)) {
            throw new TypeError('Invalid phone number');
        }

        // 确保 rent_low 和 rent_high 是有效的整数
        const parsedRentLow = parseInt(rent_low, 10);
        const parsedRentHigh = parseInt(rent_high, 10);

        // 打印转换后的 rent_low 和 rent_high 以进行调试
        console.log('Parsed rent_low:', parsedRentLow, 'Parsed rent_high:', parsedRentHigh);

        // 如果转换后的值是 NaN，则抛出错误
        if (isNaN(parsedRentLow) || isNaN(parsedRentHigh)) {
            throw new TypeError('Invalid rent values');
        }

        // 将 images 字符串转换为数组，如果已经是数组则保持不变
        const imageArray = Array.isArray(images) ? images : images.split(',');

        // 创建广告记录
        const newAdvertise = await prismaClient.advertise.create({
            data: {
                title,
                author: {
                    connect: { id: parsedAuthorId }
                },
                phone: parsedPhone,
                noroom: noroom === 'yes',
                reserve: reserve === 'yes',
                rental_rm: rental_rm || '0',
                buildtype,
                rm_type,
                rent_low: parsedRentLow,
                rent_high: parsedRentHigh,
                deposit,
                other_fee: other_fee || null,
                floor: floor || null,
                indp_mete,
                part_mate,
                gender,
                Smoke_fre,
                identity: identity || null,
                telev: telev === 'true',
                fridge: fridge === 'true',
                aircond: aircond === 'true',
                washmch: washmch === 'true',
                clothdry: clothdry === 'true',
                waterdisp: waterdisp === 'true',
                wardrobe: wardrobe === 'true',
                singlebed: singlebed === 'true',
                doublebea: doublebea === 'true',
                desk: desk === 'true',
                internet: internet === 'true',
                pub_equi: pub_equi || null,
                condition: condition || null,
                heater: heater || null,
                safe_faci: safe_faci || null,
                certified: certified || null,
                houseAge: houseAge || null,
                endAt: endAt ? new Date(endAt) : null,
                verify: verify || 'UNKNOWN',
                address,
                images: imageArray // 存储图片 URL 数组
            }
        });

        return {
            status: 'success',
            data: newAdvertise
        };
    } catch (error) {
        console.error('创建广告时出错:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
});
