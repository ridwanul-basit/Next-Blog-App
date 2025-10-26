import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile, mkdir } from "fs/promises";
import { ConnectDB } from "@/lib/config/db";
import fs from "fs/promises"; 
// import { request } from "http";

export async function GET(request) {
  try {
    await ConnectDB();
    const blogId = request.nextUrl.searchParams.get("id")
    if(blogId){
      const blog=await BlogModel.findById(blogId);
      return NextResponse.json({ success: true, blog });
    }
    else{
      const blogs = await BlogModel.find().sort({ date: -1 });
      return NextResponse.json({ success: true, blogs });
    }
    
  } catch (err) {
    console.error("GET /api/blog error:", err.message);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Connect to MongoDB
    await ConnectDB();

    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const authorImg = formData.get("authorImg");
    const image = formData.get("image");

    if (!title || !description || !category || !author || !authorImg) {
      return NextResponse.json(
        { success: false, msg: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (image && image.size > 0) {
      const timestamp = Date.now();
      const buffer = Buffer.from(await image.arrayBuffer());

      // Ensure uploads folder exists
      await mkdir("./public/uploads", { recursive: true });

      const safeName = image.name.replace(/\s+/g, "_");
      const filePath = `./public/uploads/${timestamp}_${safeName}`;
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${timestamp}_${safeName}`;
    } else {
      return NextResponse.json(
        { success: false, msg: "Image file is required" },
        { status: 400 }
      );
    }

    const blogData = { title, description, category, author, authorImg, image: imageUrl };
    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog created successfully" });
  } catch (error) {
    console.error("POST /api/blog error:", error.message);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

 
export async function DELETE(request) {
  try {
    await ConnectDB();

    const blogId = request.nextUrl.searchParams.get("id");
    if (!blogId) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    // Optional: delete associated image file if it exists
    if (blog.image && blog.image.startsWith("/uploads/")) {
      const imagePath = `./public${blog.image}`;
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.warn("Image delete warning:", err.message);
      }
    }

    await BlogModel.findByIdAndDelete(blogId);
    return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog error:", error.message);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}