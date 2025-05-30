import Header from "./../components/Header";
import Footer from "./../components/footer";
import Category from "../components/category";
import ProductSlider from "./../components/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import data from "./../data/products_with_real_images.json";
import React from "react";

export default function Home() {
  const [Menubar, setMenubar] = useState(false);

  // تجميع المنتجات حسب التصنيف
  const groupedProducts = data.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <>
      <Header Menubar={Menubar} setMenubar={setMenubar} />

      {!Menubar && (
        <>
          <Announcement />
          <NoteScrolling />

          {Object.entries(groupedProducts).map(([category, products]) => (
            <React.Fragment key={category}>
              <Category name={category} all={true} />
              <ProductSlider products={products} />
            </React.Fragment>
          ))}
        </>
      )}

      <Footer />
      <SideBar Menubar={Menubar} />
    </>
  );
}

function Announcement() {
  return (
    <div className="bg-[#E04444] mt-[70px] mb-2 text-white text-center text-sm py-2 px-4 font-Lato">
      التوصيل مجانا ولفترة محدودة لجميع انحاء الضفة
    </div>
  );
}

function NoteScrolling() {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-lg sm:max-w-xl md:max-w-3xl"
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="w-full basis-full">
              <div className="w-full h-auto">
                <img
                  src={`/note.png`}
                  alt="Promotion Banner"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
