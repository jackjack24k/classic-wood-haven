
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/product/${product._id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-serif text-lg font-medium mb-1 truncate">{product.name}</h3>
          <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
          
          {product.description && (
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="secondary"
            size="icon"
            onClick={handleAddToCart}
            className="bg-white shadow-md hover:bg-accent"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
