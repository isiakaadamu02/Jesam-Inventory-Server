import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
// Lazy singleton - created on first request, not at module load time
let prisma;
function getPrisma() {
    if (!prisma) {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        prisma = new PrismaClient({ adapter });
    }
    return prisma;
}
export const getUsers = async (req, res) => {
    try {
        const prisma = getPrisma();
        const users = await prisma.users.findMany();
        res.json(users);
    }
    catch (error) {
        console.error("get users error", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
//# sourceMappingURL=userController.js.map