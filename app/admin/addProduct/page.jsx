'use client'

import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    author: 'Alex Bennet',
    authorImg: '/author_img.png'
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          title: '',
          description: '',
          category: 'Startup',
          author: 'Alex Bennet',
          authorImg: '/author_img.png'
        });
        setImage(null);
      } else {
        toast.error(response.data.msg || "Error, something went wrong");
      }
    } catch (err) {
      console.error("Axios POST error:", err);
      toast.error("Server error");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="pt-4 px-4 sm:pt-12 sm:pl-16">
      <p className="text-xl">Upload Thumbnail</p>
      <label htmlFor="image">
        <Image
          className="mt-4"
          src={!image ? assets.upload_area : URL.createObjectURL(image)}
          width={130}
          height={70}
          alt=""
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
        required
      />

      <p className="text-xl mt-4">Blog Title</p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-300 rounded"
        type="text"
        placeholder="Enter Blog Title"
        required
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-300 rounded"
        placeholder="Enter Blog Description"
        required
      />

      <p className="text-xl mt-4">Blog Category</p>
      <select
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border border-gray-300 text-gray-500 rounded"
        name="category"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />

      <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">Add</button>
    </form>
  )
}

export default AddProductPage;
