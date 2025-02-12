import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "f1ec38e5-f62a-4d60-93a7-5414bb4d11d7");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult("");
    }
  };

  return (
    <div className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center mt-20">
        Contact{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          With Us
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        You can contact us for more information.
      </p>

      <div className="container mx-auto flex items-center justify-center ">
        <iframe
          className="w-full h-[350px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.2572779668158!2d35.316460776393065!3d37.003658156203315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288f15ca86c701%3A0x9d4d05fc85371a0d!2sADANA%20TREN%20GARI!5e0!3m2!1str!2str!4v1735482380624!5m2!1str!2str"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="container justify-center flex flex-col flex-col-reverse lg:grid lg:grid-cols-2  ">
        <section1 className="mx-auto p-8 md:flex md:flex-col ">
          <div className="flex flex-col space-y-4">
            {" "}
            {/* flex-col for vertical alignment, space-y-4 for spacing */}
            <div className="flex items-center">
              <IoLocationSharp className="mr-2 text-lg" />
              <p className="text-gray-600 text-lg text-left">
                The Westin Edmonton, 10135 102 Street NW,
                <br />
                Edmonton, AB T5J 4L4
              </p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-lg" />
              <p className="text-gray-600 text-lg">ornek@email.com</p>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-lg" />
              <p className="text-gray-600 text-lg">+90 555 555 55 55</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="flex items-center mr-4"
            >
              <FaFacebook className="text-blue-600 mr-2 text-lg" />
              Facebook
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              className="flex items-center mr-4"
            >
              <FaTwitter className="text-blue-400 mr-2 text-lg" />
              Twitter
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="flex items-center"
            >
              <FaInstagram className="text-pink-500 mr-2 text-lg" />
              Instagram
            </a>
          </div>
        </section1>

        <div>
        <form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto text-gray-600 pt-8 "
        >
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 text-left">
              Your Name
              <input
                className=" w-full border border-gray-300 rounded py-3 px-4 mt-2"
                type="text"
                name="Name"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="w-full md:w-1/2 text-left md:pl-4">
              Your Email
              <input
                className=" w-full border border-gray-300 rounded py-3 px-4 mt-2"
                type="email"
                name="Email"
                placeholder="Your Email"
                required
              />
            </div>
          </div>
          <div className="my-6 text-left">
            Message
            <textarea
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
              name="Message"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <button className="bg-blue-600 text-white py-2 px-12 mb-10 rounded">
            {result ? result : "Send Message"}
          </button>
          <ToastContainer />
        </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
