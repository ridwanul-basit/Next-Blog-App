'use client';
import BlogTableItem from '@/components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // ✅ Delete blog by ID
  const deleteBlog = async (mongoId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await axios.delete(`/api/blog?id=${mongoId}`);
      if (response.data.success) {
        alert('Blog deleted successfully!');
        fetchBlogs(); // refresh list
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold mb-4">All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto border border-gray-300 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm bg-gray-50 text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                author={item.author}
                authorImg={item.authorImg}
                title={item.title}
                date={item.date}
                onDelete={() => deleteBlog(item._id)} // 👈 pass delete handler
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
