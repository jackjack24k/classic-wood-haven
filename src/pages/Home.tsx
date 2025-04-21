
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { productsAPI, categoriesAPI } from '@/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await productsAPI.getFeatured();
        setFeaturedProducts(productsResponse.data);
        
        const categoriesResponse = await categoriesAPI.getAll();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching home page data', error);
        // Use sample data for preview purposes
        setFeaturedProducts([
          {
            _id: '1',
            name: 'Elegant Wooden Dining Table',
            price: 899,
            image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=1000',
            description: 'Beautiful oak dining table for family gatherings',
            category: 'dining'
          },
          {
            _id: '2',
            name: 'Walnut Bookshelf',
            price: 499,
            image: 'https://images.unsplash.com/photo-1588141142003-36fca9a3ab20?q=80&w=1000',
            description: 'Classic walnut bookshelf with adjustable shelves',
            category: 'storage'
          },
          {
            _id: '3',
            name: 'Teak Garden Chair',
            price: 249,
            image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?q=80&w=1000',
            description: 'Weather-resistant teak garden chair',
            category: 'outdoor'
          },
          {
            _id: '4',
            name: 'Mahogany Bedside Table',
            price: 329,
            image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000',
            description: 'Compact mahogany bedside table with drawer',
            category: 'bedroom'
          },
          {
            _id: '5',
            name: 'Cherry Wood Coffee Table',
            price: 599,
            image: 'https://images.unsplash.com/photo-1565191999001-c0c1415d08d5?q=80&w=1000',
            description: 'Stunning coffee table made from cherry wood',
            category: 'living'
          },
          {
            _id: '6',
            name: 'Maple Wood Desk',
            price: 749,
            image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000',
            description: 'Spacious maple desk for your home office',
            category: 'office'
          },
          {
            _id: '7',
            name: 'Oak Dining Chairs (Set of 4)',
            price: 1199,
            image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=1000',
            description: 'Set of 4 elegant oak dining chairs',
            category: 'dining'
          },
          {
            _id: '8',
            name: 'Pine Wood Wardrobe',
            price: 899,
            image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000',
            description: 'Spacious pine wood wardrobe with elegant design',
            category: 'bedroom'
          }
        ]);
        
        setCategories([
          { _id: '1', name: 'Living Room', image: 'https://images.unsplash.com/photo-1567767292278-a4c2c1a64931?q=80&w=1000' },
          { _id: '2', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1595514535415-dae8970c37cc?q=80&w=1000' },
          { _id: '3', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000' },
          { _id: '4', name: 'Office', image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a?q=80&w=1000' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-wood-dark text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=2000')",
          }}
        ></div>
        <div className="container-custom relative z-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-4 animate-fade-in">
              Timeless Wooden Furniture for Every Home
            </h1>
            <p className="text-lg mb-8 max-w-prose animate-fade-in opacity-90">
              Discover our collection of handcrafted wooden furniture pieces, made with love and designed to last generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-gold text-white hover:bg-gold/90">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our most popular pieces, crafted with premium wood and attention to detail
            </p>
          </div>
          
          <ProductGrid products={featuredProducts} loading={loading} />
          
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">Browse Categories</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore furniture collections designed for every space in your home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg"></div>
              ))
            ) : (
              categories.map((category: any) => (
                <Link key={category._id} to={`/categories/${category._id}`}>
                  <div className="group relative rounded-lg overflow-hidden aspect-[3/4]">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-serif text-white mb-2">{category.name}</h3>
                        <p className="text-white/90 text-sm">
                          Explore Collection
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 bg-wood bg-opacity-5">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1575516092328-247e70416d6e?q=80&w=1000" 
                  alt="Craftsman at work" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-gold text-white p-4 rounded shadow-lg hidden md:block">
                  <p className="font-serif text-2xl">30+ Years</p>
                  <p>of Expertise</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif mb-6">Crafted with Passion</h2>
              <p className="text-muted-foreground mb-6">
                Every piece of furniture at Whimsy is crafted by skilled artisans who have dedicated their lives to the art of woodworking. We select only the finest sustainable hardwoods and employ traditional joinery techniques that ensure your furniture will stand the test of time.
              </p>
              <p className="text-muted-foreground mb-8">
                From the initial design to the final hand-rubbed finish, our attention to detail and commitment to quality is evident in every piece we create.
              </p>
              <Link to="/about">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Our Craftsmanship
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Don't just take our word for it—hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4 text-gold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "The dining table we purchased is absolutely stunning. The craftsmanship is exceptional, and it has become the centerpiece of our home. Worth every penny!"
              </p>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4 text-gold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "I've furnished my entire office with Whimsy furniture. Not only is everything beautiful, but the customer service has been top-notch from selection to delivery."
              </p>
              <div>
                <p className="font-medium">David Reynolds</p>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4 text-gold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "The bookshelf I ordered is not just a piece of furniture, it's a work of art. The wood grain is beautiful and the construction is incredibly solid."
              </p>
              <div>
                <p className="font-medium">Emily Chen</p>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-wood-dark text-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1000')",
          }}
        ></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-serif mb-4">Ready to transform your space?</h2>
            <p className="mb-8">
              Browse our collection and find the perfect wooden furniture pieces that will bring warmth and elegance to your home.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-gold text-white hover:bg-gold/90">
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
