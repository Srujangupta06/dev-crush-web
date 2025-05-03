import { GoArrowUpRight } from "react-icons/go";

const EmailAlert = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black/40 w-full fixed top-0 z-50 px-4">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-xl p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">
          Please Verify Your Email
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          We’ve sent a verification email to your registered address.
        </p>
        <p className="text-sm text-gray-600 mb-6 font-semibold">
        Hurry! This verification link is valid for only 2 minutes.
        </p>

        <a
          href="https://mail.google.com/mail/#inbox"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#BF5CC9] hover:bg-[#9853a0] text-white px-6 py-1.5 text-sm rounded-md mb-4 transition duration-300"
        >
          Take me there
          <GoArrowUpRight className="inline-block ml-2" />
        </a>
      </div>
    </main>
  );
};

export default EmailAlert;
