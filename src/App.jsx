import React from 'react'
import Hero from './components/Hero'
import ChocolateExperience from './components/ChocolateExperience'
import CoffeeExperience from './components/CoffeeExperience'
import VanillaExperience from './components/VanillaExperience'
import ContactSection from './components/ContactSection'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <main className="bg-[#0D0603] text-[#F5F0E8] min-h-screen">
      <Navigation />
      <Hero />
      <ChocolateExperience />
      <CoffeeExperience />
      <VanillaExperience />
      <ContactSection />
    </main>
  )
}
