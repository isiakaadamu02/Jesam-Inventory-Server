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
export const getExpensesByCategory = async (req, res) => {
    try {
        const prisma = getPrisma();
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc",
            }
        });
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString()
        }));
        res.json(expenseByCategorySummary);
    }
    catch (error) {
        console.error("Error retrieving expenses by category", error);
        res.status(500).json({ error: "Error retrieving expenses by category" });
    }
};
//# sourceMappingURL=expenseController.js.map