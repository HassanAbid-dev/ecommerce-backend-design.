import Header from "../components/Header";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import Deals from "../components/Deals";
import RecommendedItems from "../components/RecommendedItems";
import InquiryForm from "../components/InquiryForm";
import Services from "../components/Services";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// Import category banner images from backgrounds
import clothBannerImg from "../assets/Image/backgrounds/image 98.png";
import interiorBannerImg from "../assets/Image/backgrounds/image 107.png";
import techBannerImg from "../assets/Image/backgrounds/image 106.png";

// Import product images
import clothImg1 from "../assets/Image/interior/1.png";
import clothImg2 from "../assets/Image/interior/3.png";
import clothImg3 from "../assets/Image/interior/6.png";
import clothImg4 from "../assets/Image/interior/7.png";

import interiorImg1 from "../assets/Image/interior/8.png";
import interiorImg2 from "../assets/Image/interior/9.png";
import interiorImg3 from "../assets/Image/interior/1.png";
import interiorImg4 from "../assets/Image/interior/3.png";

import techImg1 from "../assets/Image/tech/image 23.png";
import techImg2 from "../assets/Image/tech/image 29.png";
import techImg3 from "../assets/Image/tech/image 32.png";
import techImg4 from "../assets/Image/tech/8.png";

const Home = ({ setPage }) => {
  // Category 1 - Clothes
  const clothesItems = [
    { name: "Men Shirts", price: "15", image: clothImg1 },
    { name: "Winter Coats", price: "45", image: clothImg2 },
    { name: "Jeans", price: "35", image: clothImg3 },
    { name: "Accessories", price: "12", image: clothImg4 },
  ];

  // Category 2 - Home Interiors
  const interiorItems = [
    { name: "Furniture", price: "120", image: interiorImg1 },
    { name: "Lighting", price: "25", image: interiorImg2 },
    { name: "Decor Items", price: "18", image: interiorImg3 },
    { name: "Cushions", price: "22", image: interiorImg4 },
  ];

  // Category 3 - Tech & Electronics
  const techItems = [
    { name: "Smartphones", price: "250", image: techImg1 },
    { name: "Laptops", price: "600", image: techImg2 },
    { name: "Headphones", price: "80", image: techImg3 },
    { name: "Cameras", price: "500", image: techImg4 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* ===== STEP 1: Header ===== */}
      <Header setPage={setPage} />

      {/* ===== STEP 2: Main Content Container ===== */}
      <div className="container">
        {/* ===== STEP 3: Hero Section ===== */}
        <Hero />

        {/* ===== STEP 4: Category Sections ===== */}

        {/* Clothes Category */}
        <CategorySection
          title="Best Sellers In Clothes And Wear"
          bannerImg={clothBannerImg}
          items={clothesItems}
          bannerBg="#F47820"
        />

        {/* Home Interiors Category */}
        <CategorySection
          title="Home Interiors"
          bannerImg={interiorBannerImg}
          items={interiorItems}
          bannerBg="#6C7275"
        />

        {/* Tech & Electronics Category */}
        <CategorySection
          title="Electronics & Gadgets"
          bannerImg={techBannerImg}
          items={techItems}
          bannerBg="#2DAADC"
        />

        {/* ===== STEP 5: Deals and Offers Section ===== */}
        <Deals setPage={setPage} />

        {/* ===== STEP 6: Recommended Items Section ===== */}
        <RecommendedItems />

        {/* ===== STEP 7: Inquiry Form Section ===== */}
        <InquiryForm />

        {/* ===== STEP 8: Services Section ===== */}
        <Services />

        {/* ===== STEP 9: Newsletter Subscription ===== */}
        <Newsletter />
      </div>

      {/* ===== STEP 10: Footer ===== */}
      <Footer />
    </div>
  );
};

export default Home;
