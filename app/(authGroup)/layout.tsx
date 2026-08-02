import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

const AuthGroupLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default AuthGroupLayout;
