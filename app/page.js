'use client'
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
// import BlogItItem from "@/components/BlogItItem";
import Header from "@/components/Header";


export default function Home() {
  return (
  <div>
     <Header></Header>
     {/* <BlogItItem></BlogItItem> */}
     <BlogList></BlogList>
     <Footer></Footer>

  </div>
  );
}
