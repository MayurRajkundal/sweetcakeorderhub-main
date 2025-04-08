
import React from 'react';
import { Link } from 'react-router-dom';
import { useCakeContext } from '@/context/CakeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CakeSlice, Star, Clock, MapPin } from 'lucide-react';
import CategoryShowcase from '@/components/CategoryShowcase';
import WallpaperCarousel from '@/components/WallpaperCarousel';

const Home = () => {
  const { getPopularProducts } = useCakeContext();
  const popularProducts = getPopularProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section with Carousel as Background */}
      <section className="hero-gradient relative min-h-[80vh] flex items-center">
        <WallpaperCarousel />
        <div className="container relative z-10 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-4 bg-background/30 backdrop-blur-sm">
            Welcome to Sweet Cakes
          </Badge>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
            Artisanal Baked Goods<br />
            <span className="text-primary">For Every Occasion</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
            Handcrafted with love, our bakery offers custom cakes, pastries, cupcakes, cookies, and 
            artisan breads for all your special moments. Made with the finest ingredients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary/80 backdrop-blur-sm hover:bg-primary">
              <Link to="/order">Order Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/40 border-white/50 text-white">
              <Link to="/catalog">View Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features - Why Choose Sweet Cakes */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">
            Why Choose <span className="text-primary">Sweet Cakes</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <CakeSlice className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="mt-4 font-display text-xl font-medium">Premium Ingredients</h3>
              <p className="mt-2 text-muted-foreground">
                We use only the finest organic ingredients to create our delicious baked goods.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Star className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="mt-4 font-display text-xl font-medium">Customizable</h3>
              <p className="mt-2 text-muted-foreground">
                Every item is fully customizable to your preferences and dietary needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-xl font-medium">On-time Delivery</h3>
              <p className="mt-2 text-muted-foreground">
                We guarantee on-time delivery for your events and special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories */}
      <CategoryShowcase 
        category="cakes" 
        title="Cakes" 
        subtitle="Custom Cakes for Special Moments" 
      />
      
      <CategoryShowcase 
        category="pastries" 
        title="Pastries" 
        subtitle="Flaky & Delicious Pastries" 
      />
      
      <CategoryShowcase 
        category="cupcakes" 
        title="Cupcakes" 
        subtitle="Perfect Little Treats" 
      />
      
      <CategoryShowcase 
        category="cookies" 
        title="Cookies" 
        subtitle="Sweet & Crunchy Delights" 
      />
      
      <CategoryShowcase 
        category="breads" 
        title="Breads" 
        subtitle="Freshly Baked Artisan Breads" 
      />

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="cake-card rounded-lg bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-accent-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "The birthday cake was absolutely perfect! Not only was it gorgeous, 
                but it tasted amazing. Everyone at the party was impressed."
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-medium">Shweta.H</p>
                <p className="text-sm text-muted-foreground">Birthday celebration</p>
              </div>
            </div>
            <div className="cake-card rounded-lg bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-accent-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "Our wedding cake was a dream come true. Sweet Cakes understood exactly 
                what we wanted and delivered beyond our expectations!"
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-medium">Prathmesh & Shruti Dongare</p>
                <p className="text-sm text-muted-foreground">Wedding cake</p>
              </div>
            </div>
            <div className="cake-card rounded-lg bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-accent-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "I've ordered multiple times from Sweet Cakes and they never disappoint. 
                The quality and taste are consistently excellent."
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-medium">Raj Malhotra</p>
                <p className="text-sm text-muted-foreground">Regular customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Order Your Dream Baked Goods?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Let us create the perfect treats for your special occasion.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/order">Place Your Order Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
