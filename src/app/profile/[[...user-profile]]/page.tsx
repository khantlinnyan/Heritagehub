import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <main className="w-screen justify-center flex items-center h-screen">
    <UserProfile />
  </main>
);

export default UserProfilePage;
