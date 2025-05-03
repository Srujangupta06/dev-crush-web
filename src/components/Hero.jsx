import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-6 px-6 md:px-0">
        {/* <div className="absolute w-28 h-28 inset-0  bg-[#0FEFFF] rounded-full blur-2xl opacity-30 right-5 top-0"></div>
        <div className="absolute w-28 h-28 inset-0  bg-[#613DFF] rounded-full blur-2xl opacity-30 bottom-0"></div> */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold ">
          <span className="text-[#BF5CC9]">&lt; Dev </span>
          <span className="text-[#727171]">Crush /&gt;</span>
        </h1>
        <p className="text-md text-center md:text-lg text-[#727171]">
          Meet devs who share your stack, your vibe, or your startup dreams.
        </p>
        <div className="flex gap-x-2 md:gap-x-6">
          <button
            className="whitespace-nowrap hover:bg-[#9853a0] hover:border-[#9853a0] bg-[#BF5CC9] px-6 text-white py-1.5 rounded-[4px] text-sm cursor-pointer border border-[#BF5CC9]"
            onClick={() => {
              if (user) {
                navigate("/feed");
              } else {
                navigate("/auth/login");
              }
            }}
          >
            Pair Up Now
          </button>
          <button className="whitespace-nowrap hover:text-[#9853a0] hover:border-[#9853a0] text-[#BF5CC9] px-6 py-1.5 rounded-[4px] text-sm cursor-pointer border border-[#BF5CC9]">
            Learn More
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <p className="text-lg md:text-xl text-[#727171] whitespace-nowrap">
            &lt;/&gt;
            <span className="text-[#BF5CC9] font-semibold">C</span>ode
          </p>
          <p className="text-lg md:text-xl text-[#727171] whitespace-nowrap">
            🤝
            <span className="text-[#BF5CC9] font-semibold">C</span>onnect
          </p>
          <p className="text-lg md:text-xl text-[#727171] whitespace-nowrap">
            🍵
            <span className="text-[#BF5CC9] font-semibold">C</span>offee
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
