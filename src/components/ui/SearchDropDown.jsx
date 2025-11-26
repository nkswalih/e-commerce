import { Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchDropdown = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [quickLinks] = useState([
    { name: 'Find a store', path: '/store' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Laptop', path: '/laptop' },
    { name: 'Apple store', path: '/apple' },
    { name: 'support', path: '/support' }
  ])
  const navigate = useNavigate()

  useEffect(() => {
    if (searchQuery.length > 1) {
      const searchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/products')
          const products = Array.isArray(response.data) ? response.data : response.data.products || []
          
          const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
          )
          setSearchResults(filtered.slice(0, 5))
        } catch (error) {
          console.error('Search error:', error)
        }
      }
      searchProducts()
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleProductClick = (productId, close) => {
    console.log('Navigating to:', `/product/${productId}`)
    close() // Close the popover first
    setTimeout(() => {
      navigate(`/product/${productId}`)
      setSearchQuery('')
    }, 100)
  }

  const handleQuickLinkClick = (path, close) => {
    close() // Close the popover first
    setTimeout(() => {
      navigate(path)
      setSearchQuery('')
    }, 100)
  }

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors hover:cursor-pointer">
            <MagnifyingGlassIcon className="size-4 stroke-gray-700"/>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
              <div className="font-dm-sans">
                {/* Search Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 p-0">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search echoo.com"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent font-bold border-none outline-none text-lg placeholder-gray-500"
                      autoFocus
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <XMarkIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Results or Quick Links */}
                <div className="max-h-96 overflow-y-auto">
                  {searchQuery.length > 0 ? (
                    // Search Results
                    <div className="p-2">
                      {searchResults.length > 0 ? (
                        <>
                          <div className="px-3 py-2 text-sm font-semibold text-gray-500">
                            Products
                          </div>
                          {searchResults.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleProductClick(product.id, close)}
                              className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                            >
                              <img 
                                src={product.images?.[0]} 
                                alt={product.name}
                                className="w-10 h-10 object-contain rounded"
                                onError={(e) => {
                                  e.target.src = '/placeholder-image.jpg'
                                }}
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.brand} • {product.category}
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                ₹{product.price?.toLocaleString()}
                              </div>
                            </button>
                          ))}
                        </>
                      ) : (
                        <div className="px-3 py-4 text-center text-gray-500">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  ) : (
                    // Quick Links
                    <div className="p-4">
                      <div className="text-sm font-semibold text-gray-500 mb-3">
                        Quick Links
                      </div>
                      <div className="space-y-1">
                        {quickLinks.map((link) => (
                          <button
                            key={link.name}
                            onClick={() => handleQuickLinkClick(link.path, close)}
                            className="block w-full text-left px-3 py-2 hover:cursor-pointer text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {link.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>

          {/* Backdrop blur */}
          {open && (
            <div 
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40" 
              onClick={close}
            />
          )}
        </>
      )}
    </Popover>
  )
}

export default SearchDropdown