'use client';

import { assets } from '@/Assets/assets';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, use } from 'react';

const Page = ({ params }) => {
  // ✅ unwrap async params (Next.js 15+)
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const [data, setData] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: { id },
      });
      setData(response.data.blog || null);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  }; 

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // ✅ Helper to return valid image path or null
  const getImagePath = (img) => {
    if (!img || img === '') return null;
    if (img.startsWith('/uploads/')) return img;
    return `/uploads/${img}`;
  };

  if (!data) return null; // Avoid rendering until data is ready

  return (
    <>
      {/* Header Section */}
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto"  />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="Arrow" />
          </button>
        </div>

        {/* Blog Header */}
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>

          {/* ✅ Render only if author image exists */}
          {(data.authorImg) && (
            <Image
              className="mx-auto mt-6 border border-white rounded-full"
              src={(data.authorImg)}
              alt={data.author || 'Author'}
              width={60}
              height={60}
            />
          )}

          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        {/* ✅ Render only if blog image exists */}
        {getImagePath(data.image) && (
          <Image
            className="border-4 border-white"
            src={getImagePath(data.image)}
            width={1280}
            height={720}
            alt="Blog Image"
            priority
          />
        )}

        <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
        <p>{data.description}</p>

        <h3 className="my-5 text-[18px] font-semibold">Step 1: Self Reflection and Goal Setting</h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum impedit reprehenderit quisquam at, iure, dolorem veniam.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Step 2: Identify Your Strengths</h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum impedit reprehenderit quisquam at, iure, dolorem veniam.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Step 3: Execution & Consistency</h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum impedit reprehenderit quisquam at, iure, dolorem veniam.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus repudiandae magnam, perspiciatis aliquid rerum, doloribus.
        </p>

        {/* Share Section */}
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} alt="Facebook" width={40} height={40} />
            <Image src={assets.twitter_icon} alt="Twitter" width={40} height={40} />
            <Image src={assets.googleplus_icon} alt="Google Plus" width={40} height={40} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
