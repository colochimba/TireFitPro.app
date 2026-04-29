import CalculatorClient from "@/components/CalculatorClient";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <CalculatorClient />
      
      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">How to Read Tire Sizes</h2>
          <p className="mb-4 leading-relaxed">
            Understanding how to read tire sizes is essential for anyone looking to replace or upgrade their vehicle&apos;s tires. The sequence of numbers and letters on the sidewall of a tire might look like a complex code, but it provides detailed information about the tire&apos;s dimensions, construction, and performance capabilities. 
          </p>
          <p className="mb-4 leading-relaxed">
            Whether you are using a tire size calculator for an exact match or exploring new tire fitment options for an off-road setup, knowing what these specifications mean will help you make an informed decision. A tire&apos;s size impacts everything from driving comfort and fuel economy to handling and speedometer accuracy.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-6">What Does 265/70R17 Mean?</h2>
          <p className="mb-4 leading-relaxed">
            Let&apos;s break down a very common truck and SUV tire size: <strong>265/70R17</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-4 text-slate-400">
            <li>
              <strong className="text-white">265 (Section Width):</strong> The first number represents the width of the tire in millimeters from sidewall to sidewall. In this case, the tire is 265mm wide.
            </li>
            <li>
              <strong className="text-white">70 (Aspect Ratio):</strong> This is the ratio of the tire&apos;s sidewall height to its width. A 70 means the sidewall height is equal to 70% of the 265mm width. A taller sidewall typically offers a smoother ride and better off-road capability.
            </li>
            <li>
              <strong className="text-white">R (Construction):</strong> The &quot;R&quot; stands for Radial tire construction, which is the industry standard for almost all passenger and light truck tires today.
            </li>
            <li>
              <strong className="text-white">17 (Wheel Diameter):</strong> This indicates that the tire is designed to fit a 17-inch wheel or rim. If you upgrade to an 18-inch wheel, you would need a tire ending in 18.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed">
            When you use our <Link href="/" className="text-orange-400 hover:text-orange-300 underline">wheel size calculator</Link>, you can instantly see how changing the aspect ratio (like going from a 70 to a 75) alters the overall tire diameter, potentially leading to clearance issues or speedometer inaccuracies.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Why Tire Size Matters for Fitment</h2>
          <p className="mb-4 leading-relaxed">
            Proper tire fitment is critical for the safety and performance of your vehicle. Upgrading to larger tires can improve ground clearance and give your truck or SUV a more aggressive stance, but it comes with potential drawbacks if you don&apos;t calculate the differences properly.
          </p>
          <p className="mb-4 leading-relaxed">
            If a tire is too wide, it may rub against suspension components or wheel wells during sharp turns. If it&apos;s too tall, it can restrict suspension travel and throw off your vehicle&apos;s gearing and speedometer synchronization. That&apos;s why running your proposed tire sizes through a reliable <Link href="/" className="text-orange-400 hover:text-orange-300 underline">tire comparison</Link> tool is heavily recommended before making a purchase.
          </p>
          <p className="mb-4 leading-relaxed">
            Always remember to check your vehicle&apos;s owner manual and consult with suspension specialists if you plan to drastically alter your wheel diameter or overall rolling circumference.
          </p>
        </div>
      </section>
    </>
  );
}
