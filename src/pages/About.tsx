
import { Layout } from "@/components/layout/Layout"

const About = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Whimsy</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              Welcome to Whimsy, where we transform raw wood into beautiful, functional pieces that bring warmth and character to your home.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-6">
              Founded in 2020, Whimsy began with a simple mission: to create stunning wooden furniture that combines traditional craftsmanship with contemporary design. Our artisans bring decades of experience and passion to every piece they create.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
            <p className="mb-6">
              Each piece of furniture begins with carefully selected wood, chosen for its grain pattern and durability. Our craftsmen use both traditional techniques and modern tools to create pieces that will last for generations.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="mb-6">
              We're committed to sustainable practices, using responsibly sourced wood and eco-friendly finishes. Every purchase supports our mission to preserve traditional woodworking skills while creating modern, beautiful furniture.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
