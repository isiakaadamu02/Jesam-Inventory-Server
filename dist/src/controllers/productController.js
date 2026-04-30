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
export const getProducts = async (req, res) => {
    try {
        const prisma = getPrisma();
        const search = req.query.search?.toString();
        // const products = await prisma.products.findMany({
        //     where: search ? {
        //         name: {
        //             contains: search
        //         } 
        //     } : undefined
        // });       
        const where = search
            ? { name: { contains: search } }
            : {};
        const products = await prisma.products.findMany({ where });
        res.json(products);
    }
    catch (error) {
        console.error("get products error", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
export const createProduct = async (req, res) => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = await prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity
            }
        });
        res.json(product);
    }
    catch (error) {
        console.error("create product error:", error);
        res.status(500).json({ error: "Error creating product" });
    }
};
//# sourceMappingURL=productController.js.map