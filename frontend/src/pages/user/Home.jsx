import React from 'react';

const Home = () => {

    return (

        <div className="w-full min-h-screen overflow-hidden">

            <div className="relative w-full ">

                {/* Background Image */}
                <img
                    src="https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg"
                    alt="banner"
                    className="w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-16 md:px-32">

                    <h1 className="text-white text-5xl md:text-7xl font-bold font-serif mb-6">
                        Welcome
                    </h1>

                    <p className="text-white text-lg md:text-2xl font-serif leading-relaxed max-w-2xl">
                        BANNERS CREATE A POSITIVE FIRST IMPRESSION AND
                        VISITORS MAKE DECISIONS ABOUT YOUR SITE IN LESS THAN A SECOND.
                    </p>

                    {/* Search Box */}
                    <div className="mt-8 flex">

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full max-w-md px-5 py-4 rounded-l-xl outline-none text-lg text-black bg-gray-100"
                        />

                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-8 rounded-r-xl text-lg font-semibold duration-300"
                        >
                            Search
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Home;