const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

exports.postFiles = asyncHandler(async (req, res) => {
    const id = req.user.id;
    await prisma.$transaction(async (prisma) => {
        const date = new Date()
        const filePromises = req.files.map((file) => {
            return prisma.file.create({
                data: {
                    name: file.originalname,
                    url: file.path,
                    size: file.size,
                    dateUploaded: date,
                    accountId: id,
                    folderId : "bab8d821-d836-48d1-ad0b-7439bf87196e"
                },
            });
        });
        await Promise.all(filePromises);
    });
    res.send({"message": "Files saved!"});
})

exports.getFile = asyncHandler(async (req, res) => {
    const file = await prisma.file.findUnique({
        where: {
            id: req.params.fileId
        }
    })
    res.send()
})