
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col">
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              About Sweet Cakes
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Creating delicious memories with every slice since 2010
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  Sweet Cakes began as a passionate home bakery, founded by master pastry chef Emma Thompson. 
                  What started as baking for family and friends quickly grew into a beloved local bakery.
                </p>
                <p className="text-muted-foreground">
                  Over the years, we've perfected our recipes and expanded our offerings, but our commitment 
                  to quality ingredients and exceptional taste has never wavered.
                </p>
                <p className="text-muted-foreground">
                  Today, Sweet Cakes creates beautiful custom cakes for birthdays, weddings, and special events 
                  throughout the city, while maintaining the same attention to detail and quality that made us famous.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="/story.png" 
                  alt="Sweet Cakes founder" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold">Our Philosophy</h2>
            <p className="mt-4 text-muted-foreground">
              At Sweet Cakes, we believe that every celebration deserves a centerpiece 
              as unique and special as the occasion itself.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl text-primary">1</span>
              </div>
              <h3 className="mb-2 font-display text-xl font-medium">Quality Ingredients</h3>
              <p className="text-muted-foreground">
                We source only the finest organic ingredients, local when possible, to ensure superior taste and freshness.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl text-primary">2</span>
              </div>
              <h3 className="mb-2 font-display text-xl font-medium">Handcrafted with Love</h3>
              <p className="text-muted-foreground">
                Every cake is handcrafted with care, attention to detail, and a commitment to exceptional taste.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl text-primary">3</span>
              </div>
              <h3 className="mb-2 font-display text-xl font-medium">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our top priority – we work closely with each client to create their perfect cake.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold">Meet Our Team</h2>
            <p className="mt-4 text-muted-foreground">
              Our talented bakers and decorators bring creativity, skill, and passion to every cake.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/me.jpg" 
                  alt="Mayur Raj" 
                  className="h-48 w-48 object-cover transition-transform duration-300 group-hover:scale-105 mx-auto"
                />
              </div>
              <h3 className="font-display text-lg font-medium">Mayur Raj</h3>
              <p className="text-primary">Founder & Head Baker</p>
            </div>
            <div className="group text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/Sagar.jpg" 
                  alt="Sagar Shet" 
                  className="h-48 w-48 object-cover transition-transform duration-300 group-hover:scale-105 mx-auto"
                />
              </div>
              <h3 className="font-display text-lg font-medium">Sagar Shet</h3>
              <p className="text-primary">Pastry Chef</p>
            </div>
            <div className="group text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/om.jpg" 
                  alt="OM Kasar" 
                  className="h-48 w-48 object-cover transition-transform duration-300 group-hover:scale-105 mx-auto"
                />
              </div>
              <h3 className="font-display text-lg font-medium">Om Kasar</h3>
              <p className="text-primary">Cake Designer</p>
            </div>
            <div className="group text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/Kalu.jpg" 
                  alt="Harshal Kalu" 
                  className="h-48 w-48 object-cover transition-transform duration-300 group-hover:scale-105 mx-auto"
                />
              </div>
              <h3 className="font-display text-lg font-medium">Harshal Kalu</h3>
              <p className="text-primary">Cake Decorator</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
            Ready to Order Your Dream Cake?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Let us create the perfect cake for your special occasion.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/order">Place Your Order Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
