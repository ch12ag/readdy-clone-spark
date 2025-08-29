import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Coffee, Heart, ShoppingCart } from 'lucide-react';

interface CoffeeOption {
  id: string;
  name: string;
  description: string;
  price: number;
  free?: boolean;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
}

const CoffeeBuilder = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('normal');
  const [selectedGrind, setSelectedGrind] = useState('whole-bean');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedMilk, setSelectedMilk] = useState('none');
  const [selectedSyrups, setSelectedSyrups] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const flavors: CoffeeOption[] = [
    { id: 'normal', name: 'Normal', description: 'Classic coffee blend with balanced flavor', price: 0, free: true },
    { id: 'dark', name: 'Dark', description: 'Rich, bold dark roast with intense flavor', price: 25 },
    { id: 'choco', name: 'Choco', description: 'Smooth coffee with rich chocolate notes', price: 40 },
    { id: 'hazelnut', name: 'Hazelnut', description: 'Aromatic coffee with creamy hazelnut flavor', price: 35 },
  ];

  const grindTypes: CoffeeOption[] = [
    { id: 'whole-bean', name: 'Whole Bean', description: 'Maximum freshness, grind at home', price: 0, free: true },
    { id: 'coarse', name: 'Coarse', description: 'Perfect for French press and cold brew', price: 15 },
    { id: 'medium', name: 'Medium', description: 'Ideal for drip coffee makers', price: 15 },
    { id: 'fine', name: 'Fine', description: 'Best for espresso machines', price: 15 },
    { id: 'extra-fine', name: 'Extra Fine', description: 'Perfect for Turkish coffee', price: 20 },
  ];

  const sizes: CoffeeOption[] = [
    { id: 'small', name: 'Small', description: '8 oz - Perfect for a quick pick-me-up', price: 0, free: true },
    { id: 'medium', name: 'Medium', description: '12 oz - The classic choice', price: 40 },
    { id: 'large', name: 'Large', description: '16 oz - For serious coffee lovers', price: 70 },
    { id: 'extra-large', name: 'Extra Large', description: '20 oz - Maximum caffeine boost', price: 100 },
  ];

  const milkOptions: CoffeeOption[] = [
    { id: 'none', name: 'None', description: 'Pure black coffee', price: 0, free: true },
    { id: 'whole', name: 'Whole Milk', description: 'Rich and creamy texture', price: 20 },
    { id: 'oat', name: 'Oat Milk', description: 'Creamy plant-based option', price: 35 },
    { id: 'almond', name: 'Almond Milk', description: 'Light, nutty flavor', price: 30 },
    { id: 'soy', name: 'Soy Milk', description: 'Classic dairy alternative', price: 25 },
    { id: 'coconut', name: 'Coconut Milk', description: 'Rich tropical flavor', price: 40 },
    { id: 'hemp', name: 'Hemp Milk', description: 'Nutty, sustainable option', price: 45 },
  ];

  const syrups: AddonOption[] = [
    { id: 'vanilla', name: 'Vanilla', price: 30 },
    { id: 'caramel', name: 'Caramel', price: 30 },
    { id: 'hazelnut-syrup', name: 'Hazelnut', price: 35 },
    { id: 'cinnamon', name: 'Cinnamon', price: 25 },
    { id: 'peppermint', name: 'Peppermint', price: 30 },
    { id: 'coconut-syrup', name: 'Coconut', price: 40 },
    { id: 'almond-syrup', name: 'Almond', price: 35 },
    { id: 'chocolate', name: 'Chocolate', price: 45 },
  ];

  const toppings: AddonOption[] = [
    { id: 'whipped-cream', name: 'Whipped Cream', price: 25 },
    { id: 'cinnamon-powder', name: 'Cinnamon Powder', price: 15 },
    { id: 'cocoa-powder', name: 'Cocoa Powder', price: 20 },
    { id: 'caramel-drizzle', name: 'Caramel Drizzle', price: 30 },
    { id: 'chocolate-shavings', name: 'Chocolate Shavings', price: 35 },
    { id: 'marshmallows', name: 'Marshmallows', price: 25 },
    { id: 'sea-salt', name: 'Sea Salt', price: 10 },
    { id: 'honey', name: 'Honey', price: 20 },
  ];

  const calculateTotal = () => {
    const basePrice = 120;
    const flavorPrice = flavors.find(f => f.id === selectedFlavor)?.price || 0;
    const grindPrice = grindTypes.find(g => g.id === selectedGrind)?.price || 0;
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
    const milkPrice = milkOptions.find(m => m.id === selectedMilk)?.price || 0;
    const syrupPrice = selectedSyrups.reduce((total, id) => {
      const syrup = syrups.find(s => s.id === id);
      return total + (syrup?.price || 0);
    }, 0);
    const toppingPrice = selectedToppings.reduce((total, id) => {
      const topping = toppings.find(t => t.id === id);
      return total + (topping?.price || 0);
    }, 0);

    return basePrice + flavorPrice + grindPrice + sizePrice + milkPrice + syrupPrice + toppingPrice;
  };

  const toggleSyrup = (syrupId: string) => {
    setSelectedSyrups(prev => 
      prev.includes(syrupId) 
        ? prev.filter(id => id !== syrupId)
        : [...prev, syrupId]
    );
  };

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const renderOptionCard = (option: CoffeeOption, selectedValue: string, onSelect: (value: string) => void) => (
    <div 
      key={option.id}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        selectedValue === option.id 
          ? 'border-primary bg-gradient-card shadow-md' 
          : 'border-border hover:border-primary/50 bg-card'
      }`}
      onClick={() => onSelect(option.id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{option.name}</h4>
          <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
        </div>
        <div className="ml-4">
          {option.free ? (
            <Badge variant="secondary" className="bg-price-free text-price-free font-medium">Free</Badge>
          ) : (
            <Badge variant="secondary" className="bg-price-accent/10 text-price-accent font-medium">
              +₹{option.price}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-coffee-bean mb-4">
            Custom Coffee Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Create your perfect cup of coffee by selecting premium beans, roast levels, grind types, and custom mix-ins. 
            Watch your coffee come to life with real-time price calculation and visual preview.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coffee Flavor */}
            <Card className="bg-gradient-card border-coffee-cream/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-coffee-bean">
                  <Coffee className="h-5 w-5" />
                  Coffee Flavor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flavors.map(flavor => renderOptionCard(flavor, selectedFlavor, setSelectedFlavor))}
                </div>
              </CardContent>
            </Card>

            {/* Grind Type */}
            <Card className="bg-gradient-card border-coffee-cream/20">
              <CardHeader>
                <CardTitle className="text-coffee-bean">Grind Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grindTypes.map(grind => renderOptionCard(grind, selectedGrind, setSelectedGrind))}
                </div>
              </CardContent>
            </Card>

            {/* Size */}
            <Card className="bg-gradient-card border-coffee-cream/20">
              <CardHeader>
                <CardTitle className="text-coffee-bean">Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sizes.map(size => renderOptionCard(size, selectedSize, setSelectedSize))}
                </div>
              </CardContent>
            </Card>

            {/* Milk Alternative */}
            <Card className="bg-gradient-card border-coffee-cream/20">
              <CardHeader>
                <CardTitle className="text-coffee-bean">Milk Alternative</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {milkOptions.map(milk => renderOptionCard(milk, selectedMilk, setSelectedMilk))}
                </div>
              </CardContent>
            </Card>

            {/* Flavored Syrups */}
            <Card className="bg-gradient-card border-coffee-cream/20">
              <CardHeader>
                <CardTitle className="text-coffee-bean">Flavored Syrups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {syrups.map(syrup => (
                    <div key={syrup.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <Checkbox 
                        id={syrup.id}
                        checked={selectedSyrups.includes(syrup.id)}
                        onCheckedChange={() => toggleSyrup(syrup.id)}
                      />
                      <Label htmlFor={syrup.id} className="flex-1 cursor-pointer">
                        {syrup.name}
                      </Label>
                      <Badge variant="secondary" className="bg-price-accent/10 text-price-accent">
                        +₹{syrup.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Toppings */}
            <Card className="bg-gradient-card border-coffee-cream/20">
              <CardHeader>
                <CardTitle className="text-coffee-bean">Toppings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {toppings.map(topping => (
                    <div key={topping.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <Checkbox 
                        id={topping.id}
                        checked={selectedToppings.includes(topping.id)}
                        onCheckedChange={() => toggleTopping(topping.id)}
                      />
                      <Label htmlFor={topping.id} className="flex-1 cursor-pointer">
                        {topping.name}
                      </Label>
                      <Badge variant="secondary" className="bg-price-accent/10 text-price-accent">
                        +₹{topping.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview and Order Summary */}
          <div className="space-y-6">
            {/* Coffee Preview */}
            <Card className="bg-gradient-card border-coffee-cream/20 sticky top-4">
              <CardHeader>
                <CardTitle className="text-coffee-bean">Coffee Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-32 bg-gradient-coffee rounded-full relative overflow-hidden">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-coffee-light rounded-full opacity-30"></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bean Origin:</span>
                    <span>Unknown</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flavor:</span>
                    <span className="capitalize">{flavors.find(f => f.id === selectedFlavor)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grind Type:</span>
                    <span>{grindTypes.find(g => g.id === selectedGrind)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="capitalize">{sizes.find(s => s.id === selectedSize)?.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-gradient-coffee text-white border-none">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Coffee ({sizes.find(s => s.id === selectedSize)?.name})</span>
                    <span>₹120</span>
                  </div>
                  {sizes.find(s => s.id === selectedSize)?.price! > 0 && (
                    <div className="flex justify-between">
                      <span>Size Upgrade</span>
                      <span>+₹{sizes.find(s => s.id === selectedSize)?.price}</span>
                    </div>
                  )}
                  {flavors.find(f => f.id === selectedFlavor)?.price! > 0 && (
                    <div className="flex justify-between">
                      <span>Flavor</span>
                      <span>+₹{flavors.find(f => f.id === selectedFlavor)?.price}</span>
                    </div>
                  )}
                  {/* Add other price components as needed */}
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-white text-coffee-bean hover:bg-white/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                    <Heart className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeBuilder;