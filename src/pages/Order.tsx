
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Banknote } from "lucide-react";
import { useCakeContext } from '@/context/CakeContext';
import { ProductSize, CakeFlavor, CakeFilling, CakeTopping, SupabaseOrder } from '@/types/product';
import { Button } from "@/components/ui/button";
import { formatIndianRupees } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const orderFormSchema = z.object({
  productId: z.string(),
  size: z.enum(["small", "medium", "large"]),
  layers: z.number().min(1).max(5).optional(),
  flavor: z.string().optional(),
  filling: z.string().optional(),
  topping: z.string().optional(),
  nameOnCake: z.string().optional(),
  deliveryLocation: z.string().min(5, "Please provide a valid delivery address"),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  deliveryTime: z.string({
    required_error: "Please select a delivery time",
  }),
  specialInstructions: z.string().optional(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please provide a valid email address"),
  customerPhone: z.string().min(10, "Please provide a valid phone number"),
  paymentMethod: z.enum(["cod"]),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const Order = () => {
  const { toast: hookToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { addOrder, getProductById, getCakeById } = useCakeContext();
  
  const selectedProductId = location.state?.selectedProductId || "";
  const product = selectedProductId ? getProductById(selectedProductId) : null;
  
  const isCake = product?.category === 'cakes';
  const cake = isCake && selectedProductId ? getCakeById(selectedProductId) : null;
  
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const priceCalculator = () => {
    if (!product) return 0;
    
    let basePrice = product.price;
    const sizeMultiplier = form.watch('size') === 'small' ? 0.8 : form.watch('size') === 'large' ? 1.3 : 1;
    
    if (isCake && form.watch('layers')) {
      const layers = form.watch('layers') || 2;
      if (layers > 2) {
        basePrice += (layers - 2) * 400;
      }
    }
    
    return basePrice * sizeMultiplier;
  };

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      productId: selectedProductId,
      size: "medium",
      layers: isCake ? 2 : undefined,
      deliveryLocation: "",
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      deliveryTime: "14:00",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      paymentMethod: "cod",
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  useEffect(() => {
    if (selectedProductId) {
      form.setValue("productId", selectedProductId);
    }
  }, [selectedProductId, form]);

  const onSubmit = async (data: OrderFormValues) => {
    if (!product) {
      hookToast({
        title: "Error",
        description: "Product not found. Please select a product from the catalog.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Form data submitted:", data);
    
    const contextOrder = {
      productId: data.productId,
      size: data.size,
      layers: isCake ? data.layers : undefined,
      flavor: isCake ? data.flavor as CakeFlavor : undefined,
      filling: isCake ? data.filling as CakeFilling : undefined,
      topping: isCake ? data.topping as CakeTopping : undefined,
      nameOnCake: isCake ? data.nameOnCake : undefined,
      deliveryLocation: data.deliveryLocation,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
      specialInstructions: data.specialInstructions || "",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      paymentMethod: data.paymentMethod,
    };
    
    addOrder(contextOrder);
    setIsFormSubmitted(true);
  };
  
  const finalizeOrder = async () => {
    try {
      setIsSubmitting(true);
      
      const formData = form.getValues();
      const totalAmount = priceCalculator();
      
      const formattedDeliveryDate = format(formData.deliveryDate, "yyyy-MM-dd");
      
      const orderData: SupabaseOrder = {
        user_id: null,
        product_id: formData.productId,
        product_name: product?.name || "Unknown Product",
        size: formData.size,
        layers: isCake ? formData.layers || null : null,
        flavor: isCake ? formData.flavor || null : null,
        filling: isCake ? formData.filling || null : null,
        topping: isCake ? formData.topping || null : null,
        name_on_cake: isCake ? formData.nameOnCake || null : null,
        delivery_location: formData.deliveryLocation,
        delivery_date: formattedDeliveryDate,
        delivery_time: formData.deliveryTime,
        special_instructions: formData.specialInstructions || null,
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        payment_method: 'cod',
        payment_status: 'completed',
        total_amount: totalAmount
      };
      
      console.log("Sending order data to Supabase:", orderData);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select();
      
      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }
      
      console.log("Supabase response:", data);
      
      hookToast({
        title: "Order Confirmed!",
        description: "Your order has been placed successfully. Thank you!",
      });
      
      toast.success("Order placed successfully!", {
        description: data && data.length > 0 ? `Order #${data[0].id.slice(0, 8)} has been created.` : "Your order has been created.",
        duration: 5000,
      });
      
      navigate('/');
    } catch (error) {
      console.error("Error saving order:", error);
      hookToast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFormSubmitted) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Confirm Order</CardTitle>
              <CardDescription className="text-center">Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span>{product?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="capitalize">{form.getValues('size')}</span>
                  </div>
                  {isCake && (
                    <div className="flex justify-between">
                      <span>Layers:</span>
                      <span>{form.getValues('layers')}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>{formatIndianRupees(priceCalculator())}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                <div className="p-4 bg-muted rounded-md">
                  <p>You will pay the total amount of {formatIndianRupees(priceCalculator())} at the time of delivery.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsFormSubmitted(false)}>
                Back to Order
              </Button>
              <Button onClick={finalizeOrder} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Confirm Order"}
                <Banknote className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold">No Product Selected</h1>
          <p className="mt-4 text-muted-foreground">Please select a product from our catalog to place an order.</p>
          <Button className="mt-8" onClick={() => navigate('/catalog')}>
            Browse Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Order Form</h1>
          <p className="mt-2 text-muted-foreground">
            Customize your order for {product.name} - {formatIndianRupees(product.price)}
          </p>
        </div>

        <div className="rounded-lg border p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Size</FormLabel>
                    <FormDescription>Choose the size of your {product.category.slice(0, -1)}</FormDescription>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="small" className="peer sr-only" />
                        </FormControl>
                        <FormLabel className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <span>Small</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="medium" className="peer sr-only" />
                        </FormControl>
                        <FormLabel className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <span>Medium</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="large" className="peer sr-only" />
                        </FormControl>
                        <FormLabel className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <span>Large</span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isCake && cake && (
                <>
                  <FormField
                    control={form.control}
                    name="layers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Layers</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of layers" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Single Layer</SelectItem>
                            <SelectItem value="2">Double Layer</SelectItem>
                            <SelectItem value="3">Triple Layer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="flavor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flavor</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a flavor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cake.flavors.map((flavor) => (
                              <SelectItem key={flavor} value={flavor}>
                                {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="filling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Filling</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a filling" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cake.fillings.map((filling) => (
                              <SelectItem key={filling} value={filling}>
                                {filling.charAt(0).toUpperCase() + filling.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="topping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topping</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topping" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cake.toppings.map((topping) => (
                              <SelectItem key={topping} value={topping}>
                                {topping.charAt(0).toUpperCase() + topping.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nameOnCake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Cake (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Happy Birthday Sarah!" />
                        </FormControl>
                        <FormDescription>
                          Any text you'd like written on the cake
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="space-y-6">
                <h3 className="text-lg font-medium">Delivery Details</h3>

                <FormField
                  control={form.control}
                  name="deliveryLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your full address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select a date at least 24 hours in advance
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                            <Clock className="ml-auto h-4 w-4 opacity-50" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Any special requests or dietary requirements"
                          className="resize-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium">Your Information</h3>

                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your email address" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your phone number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium">Payment Method</h3>
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cod" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Banknote className="mr-2 h-4 w-4" />
                              Cash on Delivery
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="capitalize">{form.watch('size')}</span>
                  </div>
                  {isCake && (
                    <div className="flex justify-between">
                      <span>Layers:</span>
                      <span>{form.watch('layers')}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>{formatIndianRupees(priceCalculator())}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">Continue to Order Confirmation</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Order;
