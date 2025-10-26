import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const BlogTableItem = ({ authorImg, title, author, date, onDelete }) => {
  const Blogdate = new Date(date);

  return (
    <tr className="bg-white border-t border-t-gray-300">
      {/* Author */}
      <th
        scope="col"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg ? authorImg : assets.profile_icon}
          width={40}
          height={40}
          alt={author || 'No author'}
        />
        <p>{author || 'No author'}</p>
      </th>

      {/* Title */}
      <td className="px-6 py-4">{title || 'No title'}</td>

      {/* Date */}
      <td className="px-6 py-4">{Blogdate.toDateString()}</td>

      {/* Delete Action */}
      <td className="px-6 py-4">
        <button
          onClick={onDelete} // 🔹 call parent delete function
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
