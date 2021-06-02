import * as Prisma from "@prisma/client";
//|| Prisma.default.PrismaClient
let prisma = new Prisma.PrismaClient();

export default prisma;

export async function createUser(email: string, password: string) {
  try {
    let user = await prisma.user.create({
      data: {
        email,
        password,
        Category: {
          createMany: {
            data: [
              { description: "Groceries" },
              { description: "Utilties" },
              { description: "Eat Out" },
              { description: "Fun" },
            ],
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getUserByEmail(email: string) {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getUserTransactionForMonth(
  userId: number,
  monthKey: string
) {
  try {
    let transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        month: +monthKey,
      },
      include: {
        Category: {
          select: {
            id: true,
            description: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getUserTransaction(
  userId: number,
  transactionId: number
) {
  try {
    let transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      rejectOnNotFound: false,
    });
    if (transaction && transaction.userId !== userId) {
      return null;
    }
    return transaction;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getUserCategories(userId: number) {
  try {
    let categories = await prisma.category.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        description: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function updateTransaction(
  userId: number,
  transactionId: number,
  transaction
) {
  try {
    let tran = await prisma.transaction.updateMany({
      where: {
        id: transactionId,
        userId: userId,
      },
      data: transaction,
    });
    return tran;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function createTransaction(userId: number, transaction) {
  try {
    let tran = await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        description: transaction.description,
        month: transaction.month,
        categoryId: transaction.categoryId,
        timestamp: transaction.timestamp,
        userId: userId,
      },
    });
    return tran;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function deleteTransaction(userId: number, transactionId: number) {
  try {
    let { count } = await prisma.transaction.deleteMany({
      where: {
        id: transactionId,
        userId,
      },
    });
    return count == 1;
  } catch (error) {
    console.log(error);
  }
  return false;
}
