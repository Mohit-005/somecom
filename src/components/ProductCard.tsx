import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Eye, Heart } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import { useToast } from "@/components/ui/use-toast"


interface ProductCardProps {
  id?: number
  image: string
  name: string
  price: number
  originalPrice?: number
  isNew?: boolean
  category?: 'men' | 'women' | 'kids'
}

export function ProductCard({ id = 1, image, name, price, originalPrice, isNew, category = 'women' }: ProductCardProps) {
  const isOnSale = originalPrice && originalPrice > price
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const inWishlist = isInWishlist(id)

  const product = {
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    isNew,
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(id)
      toast({
        title: "Removed from wishlist",
        description: `${name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <div className="product-card group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="product-card-image"
        />
        
        {/* Badges */}
        {(isNew || isOnSale) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="px-2 py-1 text-xs font-medium bg-foreground text-background">
                NEW
              </span>
            )}
            {isOnSale && (
              <span className="px-2 py-1 text-xs font-medium bg-destructive text-destructive-foreground">
                SALE
              </span>
            )}
          </div>
        )}

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-3 right-3 z-20 bg-background/80 hover:bg-background transition-all duration-200 ${
            inWishlist ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`h-4 w-4 transition-all duration-200 ${
              inWishlist ? 'fill-current scale-110' : 'hover:scale-110'
            }`} 
          />
        </Button>

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 z-10">
          <Link to={`/product/${id}`}>
            <Button variant="secondary" size="sm" className="rounded-none">
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm leading-tight">{name}</h3>
        
        <div className="flex items-center gap-2">
          <span className="font-medium">${price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
        
        
      </div>
    </div>
  )
}