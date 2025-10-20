import Footer from "@/components/shared/Footer";
import NavMenu from "@/components/shared/NavMenu";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div >
      <div className="relative">
      <div className="absolute top-0 left-0 z-0 w-full h-full mix-blend-overlay">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <NavMenu ></NavMenu>
      {children}
      </div>
    </div>
  );
}