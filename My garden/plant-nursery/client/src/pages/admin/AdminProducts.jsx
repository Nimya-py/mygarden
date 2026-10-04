import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Sprout,
  AlertCircle,
  Filter,
} from 'lucide-react';
import API from '../../services/api';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [deleteError, setDeleteError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products/my/all');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete product "${name}"?`)) return;
    setDeleteError('');

    try {
      const res = await API.delete(`/products/${id}`);
      if (res.data.success) {
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Failed to delete product.');
    }
  };

  // Derive unique categories from existing products data
  const availableCategories = Array.from(
    new Set(
      products
        .map((p) => (typeof p.category === 'object' ? p.category?.name : p.category))
        .filter(Boolean)
    )
  );

  const filteredProducts = products.filter((p) => {
    const categoryName = typeof p.category === 'object' ? p.category?.name : p.category || '';
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      categoryName?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* 3. Page Header: Title, Subtitle, Count Badge, and Add Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">
              Products Catalog
            </h1>
            {!loading && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF0E8] text-[#163A24] border border-[#C5D0C4]">
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </span>
            )}
          </div>
          <p className="text-sm text-[#526651] mt-1 font-medium">
            Manage and organize the plants available at your nursery.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold px-4 py-2.5 rounded-lg text-xs transition-colors inline-flex items-center justify-center space-x-1.5 shadow-xs w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Error Message Alert */}
      {deleteError && (
        <div className="p-3.5 bg-[#FDF2F2] border border-[#F8B4B4] rounded-xl text-xs text-[#9B1C1C] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-[#D32F2F] shrink-0" />
            <span className="font-medium">{deleteError}</span>
          </div>
          <button
            type="button"
            onClick={() => setDeleteError('')}
            className="text-[#9B1C1C] font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4. Search and Filter Area (Clean Light Style, No Black Background) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search plants, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#D6DDD5] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
        </div>

        {/* Optional Category Filter Dropdown */}
        {availableCategories.length > 0 && (
          <div className="flex items-center space-x-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#637863]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-[#D6DDD5] rounded-lg px-3 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Categories ({products.length})</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-sm text-[#526651]">Loading catalog products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* 10. Empty State Card */
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8DF] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] text-[#163A24] flex items-center justify-center mx-auto">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#0B2115]">
              {search || selectedCategory !== 'ALL'
                ? 'No matching plants found'
                : 'No products yet'}
            </h3>
            <p className="text-xs text-[#637863] max-w-sm mx-auto mt-1">
              {search || selectedCategory !== 'ALL'
                ? 'Try adjusting your search terms or filter selection.'
                : 'Add your first plant or nursery product to start building your catalog.'}
            </p>
          </div>
          {search || selectedCategory !== 'ALL' ? (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategory('ALL');
              }}
              className="inline-block bg-white hover:bg-[#F2F4EF] text-[#163A24] font-medium text-xs px-4 py-2 rounded-lg border border-[#D6DDD5] transition-colors"
            >
              Clear Filters
            </button>
          ) : (
            <Link
              to="/admin/products/new"
              className="inline-flex items-center space-x-1.5 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Product</span>
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* 5 & 6. Desktop & Tablet Table */}
          <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-[#E2E8DF] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFBF9] text-[#163A24] uppercase text-[11px] font-semibold tracking-wider border-b border-[#E2E8DF]">
                    <th className="px-6 py-3.5">PLANT</th>
                    <th className="px-6 py-3.5">CATEGORY</th>
                    <th className="px-6 py-3.5">PRICE</th>
                    <th className="px-6 py-3.5">STATUS</th>
                    <th className="px-6 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F3EE]">
                  {filteredProducts.map((p) => {
                    const isOutOfStock = p.stockStatus === 'OUT_OF_STOCK';
                    const categoryName =
                      typeof p.category === 'object' ? p.category?.name : p.category || 'Uncategorized';

                    return (
                      <tr
                        key={p._id}
                        className="hover:bg-[#FAFBF9] transition-colors group"
                      >
                        {/* 6 & 9. Plant Image + Name & Description */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3.5">
                            <img
                              src={
                                p.images?.[0] ||
                                'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=200&q=80'
                              }
                              alt={p.name}
                              className="w-16 h-16 rounded-lg object-cover border border-[#E2E8DF] shrink-0 bg-[#FAFBF9]"
                            />
                            <div className="min-w-0 max-w-md">
                              <p className="font-semibold text-sm text-[#0B2115] truncate">
                                {p.name}
                              </p>
                              {p.description && (
                                <p className="text-xs text-[#637863] line-clamp-1 mt-0.5 leading-relaxed">
                                  {p.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-block bg-[#FAFBF9] text-[#172018] font-medium px-2.5 py-1 rounded-md border border-[#E2E8DF] text-[11px]">
                            {categoryName}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-sm text-[#163A24]">
                            ₹{p.salePrice || p.price}
                            {p.salePrice && p.salePrice < p.price && (
                              <span className="text-xs text-[#9CA3AF] line-through ml-1.5 font-normal">
                                ₹{p.price}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 7. Status Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-50 text-red-800 border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mr-1.5"></span>
                              <span>OUT OF STOCK</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block mr-1.5"></span>
                              <span>IN STOCK</span>
                            </span>
                          )}
                        </td>

                        {/* 8. Compact Action Buttons */}
                        <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                          <Link
                            to={`/admin/products/${p._id}/edit`}
                            className="p-2 bg-[#EAF0E8] hover:bg-[#D5E4D2] text-[#163A24] border border-[#C5D0C4] rounded-lg transition-colors inline-flex items-center justify-center shadow-2xs"
                            title="Edit Product"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(p._id, p.name)}
                            className="p-2 bg-[#FDF2F2] hover:bg-[#FDE2E2] text-red-700 border border-[#F8B4B4] rounded-lg transition-colors inline-flex items-center justify-center shadow-2xs"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 13. Mobile Responsive Cards (No Horizontal Scrolling) */}
          <div className="block md:hidden space-y-3.5">
            {filteredProducts.map((p) => {
              const isOutOfStock = p.stockStatus === 'OUT_OF_STOCK';
              const categoryName =
                typeof p.category === 'object' ? p.category?.name : p.category || 'Uncategorized';

              return (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl border border-[#E2E8DF] p-4 space-y-3.5 shadow-xs"
                >
                  {/* Top: 64x64px Image + Name + Description */}
                  <div className="flex items-start space-x-3">
                    <img
                      src={
                        p.images?.[0] ||
                        'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-cover border border-[#E2E8DF] shrink-0 bg-[#FAFBF9]"
                    />
                    <div className="min-w-0 flex-grow">
                      <h3 className="font-semibold text-sm text-[#0B2115] leading-snug">
                        {p.name}
                      </h3>
                      {p.description && (
                        <p className="text-xs text-[#637863] line-clamp-2 mt-1 leading-relaxed">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Middle: Details Grid */}
                  <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#E2E8DF] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#637863]">Category</span>
                      <span className="font-medium text-[#172018]">{categoryName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#637863]">Price</span>
                      <span className="font-semibold text-[#163A24]">
                        ₹{p.salePrice || p.price}
                        {p.salePrice && p.salePrice < p.price && (
                          <span className="text-[11px] text-[#9CA3AF] line-through ml-1.5 font-normal">
                            ₹{p.price}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#637863]">Status</span>
                      {isOutOfStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-800 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mr-1"></span>
                          <span>OUT OF STOCK</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block mr-1"></span>
                          <span>IN STOCK</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Edit and Delete Buttons */}
                  <div className="flex items-center space-x-2 pt-1">
                    <Link
                      to={`/admin/products/${p._id}/edit`}
                      className="flex-1 py-2 bg-[#EAF0E8] hover:bg-[#D5E4D2] text-[#163A24] border border-[#C5D0C4] rounded-lg text-xs font-semibold transition-colors inline-flex items-center justify-center space-x-1.5"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p._id, p.name)}
                      className="flex-1 py-2 bg-[#FDF2F2] hover:bg-[#FDE2E2] text-red-700 border border-[#F8B4B4] rounded-lg text-xs font-semibold transition-colors inline-flex items-center justify-center space-x-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
};
