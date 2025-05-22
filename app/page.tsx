import { useState } from "react";

interface MenuItem {
  id: number; // Assuming id is a number, adjust if it's a string
  name: string;
  foodtype: string;
  image_url: string;
  price: number;
  quantity: number;
  availability: string; // Or a more specific type like 'Available' | 'Unavailable'
}

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface HomeProps {
  menuItems?: MenuItem[];
  cartItems?: CartItem[];
  totalPrice?: number;
}

export default function Home({
  menuItems = [],
  cartItems = [],
  totalPrice = 0,
}: HomeProps) {
  const [filter, setFilter] = useState<string>("all");

  const handleFilterMenu = (category: string) => {
    setFilter(category);
  };

  const filteredMenuItems = menuItems.filter(
    (item) => filter === "all" || item.foodtype.toLowerCase() === filter
  );

  const handleAddToCart = async (menuId: number) => {
    try {
      const response = await fetch(`/api/add_to_cart/${menuId}`, {
        method: "POST",
      });
      if (response.ok) {
        console.log("Item added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async (name: string) => {
    try {
      const response = await fetch(`/api/remove_from_cart/${name}`, {
        method: "POST",
      });
      if (response.ok) {
        console.log("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", { method: "GET" });
      if (response.ok) {
        console.log("Checkout initiated");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12">
      <nav className="w-full max-w-7xl bg-white shadow-md rounded-lg py-4 px-6 flex justify-between items-center">
        <div className="flex-grow text-center">
          <span className="text-2xl font-bold text-gray-800">Edere</span>
        </div>
        <div className="flex space-x-6">
          <a
            href="/profile"
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Profile
          </a>
          <a
            href="/orders"
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Orders
          </a>
          <a
            href="/logout"
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Logout
          </a>
        </div>
      </nav>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 mt-8">
        <section className="lg:w-2/3 w-full p-6 bg-white rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-2 mb-6">
            {["all", "veg", "nonveg", "snacks", "drinks"].map(
              (category: string) => (
                <button
                  key={category}
                  onClick={() => handleFilterMenu(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-indigo-100"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item: MenuItem) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={item.image_url}
                  alt={`${item.name}`}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Category: {item.foodtype}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Price: ${item.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Availability: {item.quantity}
                  </p>
                  {item.quantity === 0 && item.availability !== "Available" ? (
                    <p className="text-sm text-red-400 mt-2">Out of Stock</p>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="w-full mt-3 bg-indigo-600 text-white text-sm font-medium py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:w-1/3 w-full p-6 bg-white rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Your Cart
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-3">Item</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item: CartItem) => (
                    <tr key={item.name} className="border-t border-gray-100">
                      <td className="py-3 font-medium text-gray-700">
                        {item.name}
                      </td>
                      <td className="py-3 text-indigo-600">{item.quantity}</td>
                      <td className="py-3 text-green-600">${item.price}</td>
                      <td className="py-3">
                        <button
                          onClick={() => handleRemoveFromCart(item.name)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-400 py-4">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
                <tr className="border-t border-gray-100">
                  <td colSpan="2" className="py-3 font-bold text-gray-800">
                    Total
                  </td>
                  <td colSpan="2" className="py-3 text-green-600 font-bold">
                    ${totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-indigo-600 text-white font-medium py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
