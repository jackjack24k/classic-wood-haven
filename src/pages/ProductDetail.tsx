
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { productsAPI } from '@/api';
import { useCart } from '@/contexts/CartContext';
import { MinusIcon, PlusIcon, Check, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getById(id || '');
        setProduct(response.data);
        
        // Fetch related products (normally would get related products by category)
        const relatedResponse = await productsAPI.getAll({ limit: 4 });
        setRelatedProducts(relatedResponse.data.products.filter((p: any) => p._id !== id));
      } catch (error) {
        console.error('Error fetching product details', error);
        // Sample data for preview
        setProduct({
          _id: '1',
          name: 'Elegant Wooden Dining Table',
          price: 899,
          discount: 0,
          images: [
            'https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=1000',
            'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1000',
            'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000',
          ],
          category: { _id: '1', name: 'Dining' },
          description: 'This beautiful dining table is crafted from solid oak using traditional woodworking techniques. The smooth, hand-finished surface showcases the natural grain of the wood, while the sturdy construction ensures this table will be a cherished part of your home for generations to come.',
          features: [
            'Made from sustainably sourced oak',
            'Hand-finished with natural oils',
            'Traditional mortise and tenon joinery',
            'Seats 6-8 people comfortably',
            'Dimensions: 72" L x 36" W x 30" H',
          ],
          specifications: {
            material: 'Solid Oak',
            dimensions: '72" L x 36" W x 30" H',
            weight: '120 lbs',
            finish: 'Hand-rubbed natural oil',
            warranty: '5-year warranty',
          },
          reviews: [
            { _id: '1', user: 'John D.', rating: 5, comment: 'Absolutely beautiful table! The craftsmanship is exceptional.', date: '2025-03-15' },
            { _id: '2', user: 'Sarah M.', rating: 4, comment: 'Love the table, though delivery took longer than expected.', date: '2025-03-01' },
          ],
          stock: 12,
          sku: 'DT-OAK-001',
        });
        
        setRelatedProducts([
          {
            _id: '2',
            name: 'Oak Dining Chairs (Set of 4)',
            price: 1199,
            image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=1000',
            description: 'Set of 4 elegant oak dining chairs',
            category: 'dining'
          },
          {
            _id: '3',
            name: 'Walnut Buffet Cabinet',
            price: 1499,
            image: 'https://images.unsplash.com/photo-1588141142003-36fca9a3ab20?q=80&w=1000',
            description: 'Beautiful walnut cabinet for dining room storage',
            category: 'dining'
          },
          {
            _id: '4',
            name: 'Maple Wood Bar Stools (Set of 2)',
            price: 599,
            image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?q=80&w=1000',
            description: 'Set of 2 elegant maple wood bar stools',
            category: 'dining'
          },
          {
            _id: '5',
            name: 'Cherry Wood Dining Bench',
            price: 799,
            image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000',
            description: 'Stunning dining bench made from cherry wood',
            category: 'dining'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-96 bg-muted animate-pulse rounded-lg"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-muted-foreground/20 rounded w-3/4"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-1/4"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
              <div className="h-12 bg-muted-foreground/20 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images || [product.image];

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          {product.category && (
            <>
              <Link to={`/categories/${product.category._id}`} className="text-muted-foreground hover:text-foreground">
                {product.category.name}
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back to shop */}
        <Link to="/shop" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back to shop
        </Link>
        
        {/* Product Detail */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square rounded-lg overflow-hidden bg-white mb-4">
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Image thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image: string, index: number) => (
                  <button 
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            
            <div className="mb-4">
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold text-primary">
                    ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                  </p>
                  <p className="text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="bg-primary text-white text-sm px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center text-sm space-x-4">
                <span className={`flex items-center ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? (
                    <>
                      <Check size={18} className="mr-1" />
                      In Stock ({product.stock} available)
                    </>
                  ) : (
                    'Out of Stock'
                  )}
                </span>
                {product.sku && (
                  <span className="text-muted-foreground">SKU: {product.sku}</span>
                )}
              </div>
            </div>
            
            <div className="border-t border-b py-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="mr-6">
                  <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 disabled:opacity-50"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stock || 10)}
                      className="px-3 py-2 disabled:opacity-50"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.stock}
                  size="lg"
                  className="bg-primary text-white px-10 hover:bg-primary/90 flex-grow md:flex-grow-0"
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white flex-grow md:flex-grow-0"
                >
                  Buy Now
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              {product.features && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 font-medium border-b-2 ${
                  activeTab === 'description' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 font-medium border-b-2 ${
                  activeTab === 'specifications' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 font-medium border-b-2 ${
                  activeTab === 'reviews' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Reviews
              </button>
            </div>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">{product.description}</p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]: any) => (
                      <div key={key} className="border-b py-3">
                        <dt className="text-muted-foreground capitalize">{key}</dt>
                        <dd className="font-medium mt-1">{value}</dd>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No specifications available for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                {product.reviews && product.reviews.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                    <div className="space-y-6">
                      {product.reviews.map((review: any) => (
                        <div key={review._id} className="border-b pb-6">
                          <div className="flex items-center mb-2">
                            <div className="flex text-gold">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-muted'}`} 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="ml-2 text-sm font-medium">{review.user}</p>
                            <p className="ml-4 text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="mb-4">This product doesn't have any reviews yet.</p>
                    <Button>Write a Review</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-8">You Might Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
