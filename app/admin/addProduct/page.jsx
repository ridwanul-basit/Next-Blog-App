'use client'

import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennet',
    authorImg: '/author_img.png' // your asset image
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Blog image is required");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({ title: '', description: '', category: 'Startup', author: 'Alex Bennet', authorImg: '/author_img.png' });
        setImage(null);
      } else {
        toast.error(response.data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error("Axios POST error:", err);
      toast.error("Server error");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="pt-4 px-4 sm:pt-12 sm:pl-16">
      <p className="text-xl">Upload Blog Thumbnail</p>
      <label htmlFor="image">
        <Image
          className="mt-4 cursor-pointer"
          src={image ? URL.createObjectURL(image) : assets.upload_area}
          width={130}
          height={70}
          alt="Blog Thumbnail"
        />
      </label>
      <input
        type="file"
        id="image"
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <p className="text-xl mt-4">Blog Title</p>
      <input
        type="text"
        name="title"
        value={data.title}
        onChange={onChangeHandler}
        placeholder="Enter Blog Title"
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border rounded border-gray-300"
        required
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        value={data.description}
        onChange={onChangeHandler}
        placeholder="Enter Blog Description"
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border rounded border-gray-300"
        required
      />

      <p className="text-xl mt-4">Category</p>
      <select
        name="category"
        value={data.category}
        onChange={onChangeHandler}
        className="w-40 mt-4 px-4 py-3 border rounded border-gray-300"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />
      <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
        Add Blog
      </button>
    </form>
  )
}

export default page;
