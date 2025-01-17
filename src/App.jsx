import "./App.css";
import Header from "./components/header";
import RetroGrid from "./components/ui/retro-grid";
import { AuroraText } from "@/components/ui/aurora-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import ImageCompressor from "./components/imagecompress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function App() {
  const scrollToCompressor = () => {
    const element = document.getElementById("compressor");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="mainContainer ">
        <div className=" my-2 min-h-screen flex flex-col items-center justify-center inset-2 z-1  ">
          <h1 className="text-5xl font-extrabold text-red-500">
            <AuroraText>Compress</AuroraText> Smart, Preserve{" "}
            <AuroraText>Quality</AuroraText>
            <br />
            <span className="text-green-500"> Meet Snap Shrink!</span>
          </h1>
          <TextAnimate animation="blurInUp" by="word" className="mt-4 mb-8">
            Optimize, resize, and transform your images with cutting-edge
            features.
          </TextAnimate>

          <ShimmerButton
            className="shadow-2xl my-4"
            onClick={scrollToCompressor}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Get Started!
            </span>
          </ShimmerButton>
          <RetroGrid className="z-0" />
        </div>
      </div>

      <div id="compressor">
        <ImageCompressor />
      </div>
      <div id="faq" className="w-[1280px] m-auto mb-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Absolutely! Your images are processed locally and not stored on
              our servers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What formats are supported?</AccordionTrigger>
            <AccordionContent>
              We support JPEG, PNG, WebP, AVIF, and more!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default App;
