const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.postFolder = asyncHandler(async (req, res) => {
    // figure out how to pass into a parent folder
    console.log(req.body.parent);
    const newFolder = await prisma.folder.create({
        data: {
            name: req.body.name,
            account: {
                connect: {
                    id: req.user.id
                }
            },
            parent: req.body.parent ? {
                connect: {
                    id: req.body.parent
                }
            } : undefined,
        }
    })

    res.send({ "message": "folder created!" });
})

exports.getFolders = asyncHandler(async (req, res) => {
    const folders = await prisma.folder.findMany({
        where: {
            accountId: req.user.id
        }
    })
    res.send(folders);
})

exports.updateFolder = asyncHandler(async (req, res) => {
    const updatedFolder = await prisma.folder.update({
        where: {
            id: req.params.folderId
        },
        data: {
            name: req.body.name
        }
    })
    res.send({ message: "Folder updated!" });
})

async function deleteFolderRecursively(folderId, transaction) {
    const childFolders = await transaction.folder.findMany({
        where: { parentId: folderId },
    });

    for (const child of childFolders) {
        await deleteFolderRecursively(child.id, transaction);
    }

    await transaction.folder.delete({
        where: { id: folderId },
    });
}
  
exports.deleteFolder = asyncHandler(async (req, res) => {
    const folderId = req.params.folderId;
  
    try {
        await prisma.$transaction(async (transaction) => {
            await deleteFolderRecursively(folderId, transaction);
        });
        
        res.send({ message: "Folder and all its children deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while deleting the folder." });
    }
});