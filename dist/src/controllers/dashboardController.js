import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
let prisma;
function getPrisma() {
    if (!prisma) {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        prisma = new PrismaClient({ adapter });
    }
    return prisma;
}
export const getDashboardMetrics = async (req, res) => {
    try {
        const prisma = getPrisma();
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc"
            },
        });
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            },
        });
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            },
        });
        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            },
        });
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            },
        });
        //transforming expense summary to string
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString()
        }));
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary
        });
    }
    catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
};
//# sourceMappingURL=dashboardController.js.map