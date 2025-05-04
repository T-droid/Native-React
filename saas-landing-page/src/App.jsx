import Download from "./sections/Download"
import Faq from "./sections/Faq"
import Features from "./sections/features"
import Footer from "./sections/Footer"
import Header from "./sections/header"
import Hero from "./sections/hero"
import Pricing from "./sections/pricing"
import Testimonials from "./sections/Testimonials"


const App = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Testimonials />
      <Download />
      <Footer />
    </main>
  )
}

export default App
