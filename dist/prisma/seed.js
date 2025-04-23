"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    await prisma.trackingEvent.deleteMany();
    await prisma.shippingTracking.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.user.deleteMany();
    await prisma.blockchainTransaction.deleteMany();
    await prisma.smartContract.deleteMany();
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    const sellerPassword = await bcrypt.hash('seller123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@nexusmarket.com',
            username: 'admin',
            password: adminPassword,
            walletAddress: 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q7Z5JKKQ5CR4PAZHA',
            role: 'ADMIN',
        },
    });
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            username: 'user1',
            password: userPassword,
            walletAddress: 'GD5HQYJ65KFBCGGLTWPKHJL6KPVLVJVXVRLZU6OUWPTF7MPQD25RPJAK',
            bio: 'Entusiasta de productos tecnológicos y cripto',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            username: 'user2',
            password: userPassword,
            walletAddress: 'GCDJVSC5DJQSVNDMEEVJZKMXDG7HIKRVA7HJZPGDPXWMKOH7HLIBFRF5',
        },
    });
    const seller1 = await prisma.seller.create({
        data: {
            userId: user1.id,
            storeName: 'Tech Galaxy',
            storeDescription: 'Productos tecnológicos de alta calidad',
            contactEmail: 'techgalaxy@example.com',
            contactPhone: '+1234567890',
            verified: true,
            reputationScore: 4.8,
        },
    });
    const seller2User = await prisma.user.create({
        data: {
            email: 'seller@example.com',
            username: 'seller2',
            password: sellerPassword,
            walletAddress: 'GBFDEQK5R3FQE7KZKFH222FXFCFK4FUOOG6DV6JDJ33NBE4BPCVLQPDX',
            bio: 'Vendedor profesional de artículos digitales',
        },
    });
    const seller2 = await prisma.seller.create({
        data: {
            userId: seller2User.id,
            storeName: 'Digital Assets Market',
            storeDescription: 'Especialistas en productos digitales',
            contactEmail: 'digital@example.com',
            verified: true,
            reputationScore: 4.5,
        },
    });
    const electronicsCategory = await prisma.category.create({
        data: {
            name: 'Electrónicos',
            description: 'Productos electrónicos y gadgets',
            slug: 'electronics',
            imageUrl: 'https://example.com/electronics.jpg',
        },
    });
    const mobileCategory = await prisma.category.create({
        data: {
            name: 'Móviles',
            description: 'Smartphones y accesorios',
            slug: 'mobile',
            parentId: electronicsCategory.id,
        },
    });
    const digitalGoodsCategory = await prisma.category.create({
        data: {
            name: 'Bienes Digitales',
            description: 'Productos digitales como ebooks, software, etc.',
            slug: 'digital-goods',
            imageUrl: 'https://example.com/digital.jpg',
        },
    });
    const product1 = await prisma.product.create({
        data: {
            name: 'Smartphone X2000',
            description: 'El smartphone más avanzado del mercado con tecnología blockchain integrada',
            price: 599.99,
            currencyType: 'USDC',
            stock: 50,
            condition: 'NEW',
            slug: 'smartphone-x2000',
            sellerId: seller1.id,
            userId: user1.id,
            categoryId: mobileCategory.id,
        },
    });
    await prisma.productImage.create({
        data: {
            url: 'https://example.com/products/smartphone1.jpg',
            isFeatured: true,
            productId: product1.id,
        },
    });
    await prisma.productImage.create({
        data: {
            url: 'https://example.com/products/smartphone2.jpg',
            productId: product1.id,
        },
    });
    const product2 = await prisma.product.create({
        data: {
            name: 'Guía Completa de Blockchain',
            description: 'E-book con toda la información para dominar la tecnología blockchain',
            price: 19.99,
            currencyType: 'USDC',
            stock: 999,
            isDigital: true,
            digitalUrl: 'https://example.com/downloads/blockchain-guide.pdf',
            slug: 'blockchain-guide-ebook',
            sellerId: seller2.id,
            userId: seller2User.id,
            categoryId: digitalGoodsCategory.id,
        },
    });
    await prisma.productImage.create({
        data: {
            url: 'https://example.com/products/ebook-cover.jpg',
            isFeatured: true,
            productId: product2.id,
        },
    });
    const order = await prisma.order.create({
        data: {
            orderNumber: 'NM00001',
            total: 599.99,
            currencyType: 'USDC',
            status: 'DELIVERED',
            paymentStatus: 'COMPLETED',
            paymentMethod: 'STELLAR_USDC',
            shippingAddress: 'Calle Principal 123, Ciudad',
            txHash: '12345abcdef67890abcdef12345abcdef67890abcdef12345abcdef67890abc',
            userId: user2.id,
            sellerId: seller1.id,
        },
    });
    await prisma.orderItem.create({
        data: {
            quantity: 1,
            price: 599.99,
            orderId: order.id,
            productId: product1.id,
        },
    });
    await prisma.shippingTracking.create({
        data: {
            trackingNumber: 'TRACK123456',
            carrier: 'Express Delivery',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'DELIVERED',
            contractAddress: 'CBVXZABCDEFGHI123456789ABCDEFGHI123456789',
            orderId: order.id,
        },
    });
    await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Excelente producto, llegó antes de lo esperado',
            userId: user2.id,
            receiverId: user1.id,
            productId: product1.id,
        },
    });
    await prisma.notification.create({
        data: {
            type: 'ORDER',
            title: 'Tu orden ha sido entregada',
            message: 'Tu orden #NM00001 ha sido entregada con éxito.',
            userId: user2.id,
        },
    });
    await prisma.blockchainTransaction.create({
        data: {
            txHash: '12345abcdef67890abcdef12345abcdef67890abcdef12345abcdef67890abc',
            fromAddress: user2.walletAddress ?? '',
            toAddress: user1.walletAddress ?? '',
            amount: '599.99',
            currency: 'USDC',
            status: 'CONFIRMED',
            type: 'PAYMENT',
            confirmedAt: new Date(),
        },
    });
    await prisma.smartContract.create({
        data: {
            name: 'NexusMarket Escrow',
            address: 'CBVXZABCDEFGHI123456789ABCDEFGHI123456789',
            network: 'SOROBAN_TESTNET',
            type: 'ESCROW',
            version: '1.0.0',
            abi: JSON.parse('{"functions":[{"name":"deposit","inputs":[{"name":"seller","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[]},{"name":"release","inputs":[{"name":"orderId","type":"string"}],"outputs":[]}]}'),
        },
    });
    console.log('Database seeded successfully');
}
main()
    .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map