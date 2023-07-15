const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
    await prisma.category.createMany({
        data: [
            { name: "Web Development" },
            { name: "Mobile Development" },
            { name: "Networking" },
            { name: "Cyber Security" },
            { name: "AI" },
        ],
    });
};

seed()
    .catch(error => {
        console.log(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

