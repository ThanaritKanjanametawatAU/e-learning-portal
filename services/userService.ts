import { dbConnect } from '@/lib/db';

// ... other service functions ...

export async function deleteUser(userId: string): Promise<void> {
  await dbConnect.user.delete({
    where: { id: userId },
  });
}