import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScheduleSection from "@/components/ScheduleSection";
import FAQSection from "@/components/FAQSection";
import RegisterSection from "@/components/RegisterSection";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import JurySection from "@/components/Jurysection";
import SponsorsSection from "@/components/SponsorsSection";
import MentorsSection from "@/components/Mentorssection";
import VideoSection from "@/components/Videosection";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'black' }}>
     
      <HeroSection />
      <AboutSection />
      {/* <ScheduleSection /> */}
      <FAQSection />
      <LocationSection />
      <JurySection />
      <MentorsSection />
            <VideoSection />

      <SponsorsSection />
      {/* <RegisterSection /> */}
      <Footer />
    </div>
  );
};

export default Index;