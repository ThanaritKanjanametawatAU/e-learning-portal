import { db } from '@/lib/db';

// ... other service functions ...

export async function deleteUser(userId: string): Promise<void> {
  await db.user.delete({
    where: { id: userId },
  });
}