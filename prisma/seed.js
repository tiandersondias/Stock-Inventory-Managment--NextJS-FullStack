// Seed MongoDB with minimal data to materialize collections
// Run via: pnpm exec prisma db seed
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "demo@example.com";
  const password = "password123";
  const hashed = await bcrypt.hash(password, 10);

  // Upsert user by unique email
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Demo User",
      email,
      password: hashed,
    },
  });

  // Ensure a Category exists for this user
  let category = await prisma.category.findFirst({
    where: { userId: user.id, name: "General" },
  });
  if (!category) {
    category = await prisma.category.create({
      data: { name: "General", userId: user.id },
    });
  }

  // Ensure a Supplier exists for this user
  let supplier = await prisma.supplier.findFirst({
    where: { userId: user.id, name: "Default Supplier" },
  });
  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: { name: "Default Supplier", userId: user.id },
    });
  }

  // Upsert a Product by unique sku
  await prisma.product.upsert({
    where: { sku: "SKU-0001" },
    update: {},
    create: {
      name: "Sample Product",
      sku: "SKU-0001",
      price: 19.99,
      quantity: 100,
      status: "Available",
      userId: user.id,
      categoryId: category.id,
      supplierId: supplier.id,
    },
  });

  console.log(
    "Seed completed: demo user, category, supplier, and product ready."
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
