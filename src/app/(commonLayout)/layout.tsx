import '../not-found.css';
export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div >

      <div className="absolute top-0 left-0 z-0 w-full h-full mix-blend-overlay">
        <video
          className="absolute top-0 left-0 w-full h-full lg:object-cover z-[-1]"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

      </div>
      <div className="notFoundContainer">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>

        {children}
      </div> </div>


  );
}