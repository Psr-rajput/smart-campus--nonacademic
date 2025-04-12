"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<{ name: string; price: number; quantity: number }[]>([])
  const [orderConfirmed, setOrderConfirmed] = useState(false)  // State to track order confirmation
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem("canteenCart")
    if (data) setCartItems(JSON.parse(data))
  }, [])

  // Calculate the total price for all selected items
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Generate a random invoice ID and current date
  const invoiceId = Math.floor(Math.random() * 900000 + 100000)
  const date = new Date().toLocaleString()

  // Update quantity in cartItems
  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedCartItems = [...cartItems]
    updatedCartItems[index].quantity = quantity
    setCartItems(updatedCartItems)
  }

  // Handle order confirmation
  const handleConfirmOrder = () => {
    setOrderConfirmed(true)
    // Optionally, you can clear the cart after confirmation
    localStorage.removeItem("canteenCart")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-6 space-y-6 bg-white shadow-xl rounded-xl border border-gray-200">
        
        {/* Beautiful Greeting */}
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          🎉 Welcome to Your Canteen Order 🧾
        </h2>

        {orderConfirmed ? (
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-green-600 mb-4">Thank You for Your Order! 🙏</h3>
            <p className="text-lg text-gray-600 mb-4">We appreciate your business. We hope you enjoy your meal!</p>
            <Button
              variant="secondary"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/canteen")}
            >
              Go Back to Menu
            </Button>
          </div>
        ) : (
          <div>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>Invoice ID: #{invoiceId}</span>
              <span>{date}</span>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">🛒 Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                <div className="border-t border-b py-2">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <span className="text-lg text-gray-700">{item.name}</span>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-lg bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                          onClick={() => handleQuantityChange(i, Math.max(item.quantity - 1, 1))}
                        >
                          -
                        </button>
                        <span className="text-lg text-gray-600">x{item.quantity}</span>
                        <button
                          className="text-lg bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                          onClick={() => handleQuantityChange(i, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Price per item */}
                      <span className="text-lg font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Price */}
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-between gap-4 pt-4">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.push("/canteen")}
                >
                  ⬅️ Back to Menu
                </Button>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleConfirmOrder}  // Trigger order confirmation
                >
                  ✅ Confirm Order
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
