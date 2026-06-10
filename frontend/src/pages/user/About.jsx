import React from 'react';

const About = () => {

    return (

        <div className="bg-gray-100 min-h-screen">

            {/* HERO SECTION */}

            <div className="bg-gradient-to-r from-green-400 to-purple-500 text-white py-20 px-6 mt-20">

                <div className="max-w-7xl mx-auto text-center">

                    <h1 className="text-5xl font-extrabold mb-6">
                        About Our Store
                    </h1>

                    <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Welcome to our E-Commerce platform where quality products,
                        affordable prices, and customer satisfaction come together.
                    </p>

                </div>

            </div>

            {/* ABOUT SECTION */}

            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* IMAGE */}

                <div>

                    <img
                        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
                        alt="about"
                        className="rounded-3xl shadow-2xl w-full h-500 object-cover"
                    />

                </div>

                {/* CONTENT */}

                <div>

                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Who We Are
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">

                        We are a modern online shopping platform dedicated to
                        providing customers with the best shopping experience.
                        From fashion and electronics to home essentials, we bring
                        top-quality products directly to your doorstep.

                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed">

                        Our mission is to make online shopping simple, secure,
                        and affordable for everyone. We continuously improve our
                        platform to deliver faster delivery, trusted products,
                        and excellent customer support.

                    </p>

                </div>

            </div>

            {/* FEATURES */}

            <div className="bg-white py-20 px-6">

                <div className="max-w-7xl mx-auto">

                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
                        Why Choose Us
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* CARD */}

                        <div className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center">

                            <div className="text-6xl mb-5">
                                🚚
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Fast Delivery
                            </h3>

                            <p className="text-gray-600">
                                Quick and reliable shipping across the country.
                            </p>

                        </div>

                        {/* CARD */}

                        <div className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center">

                            <div className="text-6xl mb-5">
                                💳
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Secure Payment
                            </h3>

                            <p className="text-gray-600">
                                Safe and encrypted payment methods for all users.
                            </p>

                        </div>

                        {/* CARD */}

                        <div className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center">

                            <div className="text-6xl mb-5">
                                ⭐
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Quality Products
                            </h3>

                            <p className="text-gray-600">
                                Premium quality products at affordable prices.
                            </p>

                        </div>

                        {/* CARD */}

                        <div className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center">

                            <div className="text-6xl mb-5">
                                📞
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                24/7 Support
                            </h3>

                            <p className="text-gray-600">
                                Dedicated support team always ready to help you.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* STATS */}

            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20 px-6 text-white">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

                    <div>

                        <h2 className="text-5xl font-extrabold">
                            10K+
                        </h2>

                        <p className="mt-4 text-xl text-gray-200">
                            Happy Customers
                        </p>

                    </div>

                    <div>

                        <h2 className="text-5xl font-extrabold">
                            5K+
                        </h2>

                        <p className="mt-4 text-xl text-gray-200">
                            Products Available
                        </p>

                    </div>

                    <div>

                        <h2 className="text-5xl font-extrabold">
                            99%
                        </h2>

                        <p className="mt-4 text-xl text-gray-200">
                            Customer Satisfaction
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default About;