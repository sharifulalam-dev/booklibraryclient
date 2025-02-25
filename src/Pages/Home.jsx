import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomePage = () => {
  const FeaturedBooks = [
    {
      id: 1,
      title: "Animal Farm",
      author: "George Orwell",
      image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
      categroy: "Drama",
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
      categroy: "History",
    },
    {
      id: 3,
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      image: "https://covers.openlibrary.org/b/isbn/9780062301673-L.jpg",
      categroy: "Thriller",
    },
    {
      id: 4,
      title: "The Catcher in the Rye",
      author: " J.D. Salinger",
      image: "https://covers.openlibrary.org/b/isbn/9780307277671-L.jpg",
      categroy: "Novel",
    },
  ];

  return (
    <div className="bg-[#f1f1f1] text-gray-800">
      <div className="max-h-screen -z-0">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide>
            <div className="relative w-full h-screen overflow-hidden">
              <img
                src="https://boighor-demo.myshopify.com/cdn/shop/files/1.jpg"
                alt="Slide 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-left">
                <div className="container mx-auto text-left px-4">
                  <Link
                    to="/"
                    className="text-3xl md:text-7xl font-bold text-[#444] md:leading-[1.3]"
                  >
                    Fuel, <span className="text-[#f39c12]">Minds</span>
                    <br />
                    Ignite<span className="text-[#f39c12]"> Creativity</span>
                    <br />
                    <Typewriter
                      words={["Next Chapter Awaits!"]}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-full h-screen overflow-hidden">
              <img
                src="https://boighor-demo.myshopify.com/cdn/shop/files/7.jpg"
                alt="Slide 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-left">
                <div className="container mx-auto text-left px-4">
                  <Link
                    to="/"
                    className="text-3xl md:text-7xl font-bold text-[#444] md:leading-[1.3]"
                  >
                    Books for <span className="text-[#f39c12]">Everyone</span>
                    <br />
                    Refresh Your<span className="text-[#f39c12]"> Soul</span>
                    <br />
                    <Typewriter
                      words={["Never Stop Learning ...."]}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-full h-screen overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1468779036391-52341f60b55d?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Slide 3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-left">
                <div className="container mx-auto text-left px-4">
                  <Link
                    to="/"
                    className="text-3xl md:text-7xl font-bold text-[#444] md:leading-[1.3]"
                  >
                    Open a <span className="text-[#f39c12]">Book</span>
                    <br />
                    Open Your <span className="text-[#f39c12]"> World</span>
                    <br />
                    <Typewriter
                      words={["Where Story Starts !"]}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="bg-[#f8f8f8] py-24">
        <h1 className="text-center text-4xl font-semibold mb-12 text-gray-800">
          Choose Your Book!
        </h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-4">
            <div className="relative overflow-hidden group rounded-lg shadow-lg h-96 bg-white">
              <img
                src="https://katemccaffrey.org/wp-content/uploads/2010/08/9781921361982_beautifulmonster.jpg"
                alt="Novel"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500">
                <Link
                  to="/category/Novel"
                  className="text-white text-2xl font-bold uppercase px-6 py-3 bg-red-500 rounded-md shadow-md transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  Novel
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-lg shadow-lg h-96 bg-white">
              <img
                src="https://romancepremades.com/wp-content/uploads/2024/11/Daniel-Last-Sunset-wf.jpg"
                alt="Thriller"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500">
                <Link
                  to="/category/Thriller"
                  className="text-white text-2xl font-bold uppercase px-6 py-3 bg-blue-500 rounded-md shadow-md transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  Thriller
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-lg shadow-lg h-96 bg-white">
              <img
                src="https://romancepremades.com/wp-content/uploads/2024/11/Kristina-Summer-disc.jpg"
                alt="History"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500">
                <Link
                  to="/category/History"
                  className="text-white text-2xl font-bold uppercase px-6 py-3 bg-green-500 rounded-md shadow-md transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  History
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-lg shadow-lg h-96 bg-white">
              <img
                src="https://romancepremades.com/wp-content/uploads/2024/11/Daniel-never-tell.jpg"
                alt="Drama"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500">
                <Link
                  to="/category/Drama"
                  className="text-white text-2xl font-bold uppercase px-6 py-3 bg-yellow-500 rounded-md shadow-md transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  Drama
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black uppercase">
            Our Achievements
          </h2>
          <p className="text-lg text-black mt-4">
            Dedicated to excellence and a legacy of success
          </p>
        </div>

        <div className="bg-[#0056b3] py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
              <div className="flex flex-col items-center justify-between text-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-400 flex items-center justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold">
                        <CountUp start={0} end={21} duration={5} />
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg md:text-xl font-medium uppercase">
                  Working Year
                </p>
                <div className="w-12 mt-2 border-b-2 border-white"></div>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-400 flex items-center justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold">
                        <CountUp start={0} end={859} duration={5} />
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg md:text-xl font-medium uppercase">
                  Books Sold
                </p>
                <div className="w-12 mt-2 border-b-2 border-white"></div>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-400 flex items-center justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold">
                        <CountUp start={0} end={458} duration={5} />
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg md:text-xl font-medium uppercase">
                  Top Author
                </p>
                <div className="w-12 mt-2 border-b-2 border-white"></div>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-400 flex items-center justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold">
                        <CountUp start={0} end={750} duration={5} />
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg md:text-xl font-medium uppercase">
                  Book Published
                </p>
                <div className="w-12 mt-2 border-b-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-4">
            {FeaturedBooks.map((book) => (
              <Link key={book.id} to={`/category/${book.categroy}`}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="mt-2 text-gray-600">{book.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-cover bg-center bg-[#0056b3] py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Testimonials
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            What our clients say about the books reviews and comments
          </p>
          <div className="border-t-2 border-[#333] w-16 mx-auto my-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <p className="text-[#444] italic mb-6 text-xl">
                <span className="text-[#0056b3] text-3xl font-bold mr-2">
                  “
                </span>
                I loved thrift books! It's refreshing to buy discounted books
                and have them shipped quickly. I could afford to buy 3 copies to
                hand out to friends also interested in the topic. Thank you!!
              </p>
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-100 border-2 border-orange-500 flex items-center justify-center overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?img=69"
                  alt="Jenifer"
                  className="rounded-full"
                />
              </div>
              <div className="mt-10 text-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  James Robbert
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <p className="text-gray-600 italic mb-6 text-xl">
                <span className="text-[#0056b3] text-3xl font-bold mr-2">
                  “
                </span>
                You have great prices and the books are in the shape as stated.
                Although it takes so long for them to get to their destination,
                I have been ordering for years and get great books in the shape
                said.
              </p>
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-100 border-2 border-orange-500 flex items-center justify-center overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?img=59"
                  alt="James Anderson"
                  className="rounded-full"
                />
              </div>
              <div className="mt-10 text-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  James Anderson
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
