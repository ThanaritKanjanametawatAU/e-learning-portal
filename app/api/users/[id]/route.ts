import { NextResponse } from 'next/server';
import { deleteUser } from '@/services/userService';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // Implement user authentication and authorization here
    // Ensure that the logged-in user can only delete their own account

    await deleteUser(userId);

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}