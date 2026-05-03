import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin1234!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admedif.local' },
    update: {},
    create: {
      email: 'admin@admedif.local',
      password,
      firstName: 'Super',
      lastName: 'Administrador',
      role: Role.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log(`✔ Usuario SUPER_ADMIN creado: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
