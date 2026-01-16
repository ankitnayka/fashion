import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma/prisma";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return 
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
    </div>
  );
}
