import React, { useState, useMemo } from 'react';
import { ChevronDownIcon, CloseIcon, SearchIcon, FilterIcon } from '../Icons';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { id: 'all', name: 'Tất cả', color: 'amber', count: 0 },
    { id: 'Kiến thức', name: 'Kiến thức', color: 'blue', count: 0 },
    { id: 'Sức khỏe', name: 'Sức khỏe', color: 'green', count: 0 },
    { id: 'Phong thủy', name: 'Phong thủy', color: 'purple', count: 0 },
    { id: 'Sản phẩm', name: 'Sản phẩm', color: 'red', count: 0 },
    { id: 'Kỹ thuật', name: 'Kỹ thuật', color: 'indigo', count: 0 },
    { id: 'Văn hóa', name: 'Văn hóa', color: 'pink', count: 0 },
    { id: 'Xu hướng', name: 'Xu hướng', color: 'orange', count: 0 },
    { id: 'Đầu tư', name: 'Đầu tư', color: 'emerald', count: 0 }
  ];

  // Import dữ liệu từ newsData
  const { newsData } = require('../data/newsData');
  const articles = newsData || [];

  // Update category counts
  const categoriesWithCount = useMemo(() => {
    const counts = {};
    articles.forEach(article => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    
    return categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? articles.length : (counts[cat.id] || 0)
    }));
  }, [articles]);

  // Filter và search articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Sort articles
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'readTime':
        filtered.sort((a, b) => {
          const aTime = parseInt(a.readTime) || 0;
          const bTime = parseInt(b.readTime) || 0;
          return aTime - bTime;
        });
        break;
      default:
        break;
    }
    
    return filtered;
  }, [articles, selectedCategory, searchTerm, sortBy]);

  const getCategoryColor = (color) => {
    const colors = {
      amber: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
      blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      pink: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700',
      orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
    };
    return colors[color] || colors.amber;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (selectedArticle) {
    return (
      <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="pt-16 lg:pt-20">
          {/* Article Detail View - Ultra Premium Design */}
          <div className="min-h-screen relative overflow-hidden">
            {/* Luxury Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-orange-900/10"></div>
              {/* Floating orbs */}
              <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-3 lg:px-6 py-6 lg:py-12">
              {/* Premium Header Bar */}
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="group flex items-center space-x-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 px-4 py-3 rounded-2xl hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-amber-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-white font-medium group-hover:text-amber-300 transition-colors">Quay lại</span>
                </button>
                
                {/* Article Meta */}
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{selectedArticle.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{formatDate(selectedArticle.date)}</span>
                  </div>
                </div>
              </div>

              {/* Premium Article Content */}
              <article className="max-w-4xl mx-auto">
                {/* Hero Image */}
                <div className="relative h-64 lg:h-96 rounded-3xl overflow-hidden mb-8 lg:mb-12">
                  <img 
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-2 rounded-2xl text-sm font-semibold border backdrop-blur-sm ${getCategoryColor(categoriesWithCount.find(c => c.name === selectedArticle.category)?.color)}`}>
                      {selectedArticle.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {selectedArticle.featured && (
                    <div className="absolute top-6 right-6">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-bold backdrop-blur-sm border border-white/20">
                        ⭐ Nổi bật
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 p-6 lg:p-12">
                  {/* Title */}
                  <h1 className="text-2xl lg:text-4xl xl:text-5xl font-black text-gray-900 dark:text-white mb-6 lg:mb-8 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  
                  {/* Author and Meta */}
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-8 lg:mb-12 pb-6 lg:pb-8 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{selectedArticle.author?.charAt(0) || 'A'}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedArticle.author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Chuyên gia</p>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    {selectedArticle.tags && (
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Excerpt */}
                  <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 lg:mb-12 italic font-medium leading-relaxed bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-2xl border-l-4 border-amber-500">
                    {selectedArticle.excerpt}
                  </p>
                  
                  {/* Content */}
                  <div 
                    className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-amber prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-amber-600 dark:prose-a:text-amber-400"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />

                  {/* Bottom Meta */}
                  <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Cập nhật: {formatDate(selectedArticle.date)}
                      </div>
                      {selectedArticle.sourceUrl && (
                        <a 
                          href={selectedArticle.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
                        >
                          Xem nguồn →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="pt-16 lg:pt-20">
        {/* Ultra Premium News Page */}
        <div className="min-h-screen relative overflow-hidden">
          {/* Luxury Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-orange-900/10"></div>
            {/* Animated particles */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/8 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-amber-300/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-2 lg:px-6 py-6 lg:py-12">
            {/* Premium Header */}
            <div className="text-center mb-8 lg:mb-16">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 px-6 py-3 rounded-2xl mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-sm tracking-wide">TIN TỨC TRẦM HƯƠNG</span>
              </div>

              <h1 className="text-3xl lg:text-6xl xl:text-7xl font-black text-white mb-6 lg:mb-8">
                Khám phá thế giới{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                  trầm hương
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                Cập nhật những thông tin mới nhất về trầm hương với{' '}
                <span className="text-amber-400 font-semibold">{articles.length} bài viết</span> chuyên sâu
                <br className="hidden lg:block" />
                từ các chuyên gia hàng đầu
              </p>
            </div>

            {/* Premium Search & Filter Bar */}
            <div className="mb-8 lg:mb-12">
              <div className="max-w-4xl mx-auto">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết, tác giả, chủ đề..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <CloseIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    </button>
                  )}
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  {/* Category Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                      className="flex items-center space-x-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 px-4 py-3 rounded-xl text-white hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300"
                    >
                      <FilterIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {categoriesWithCount.find(c => c.id === selectedCategory)?.name} 
                        {selectedCategory !== 'all' && ` (${filteredArticles.length})`}
                      </span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showCategoryFilter ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Category Dropdown */}
                    {showCategoryFilter && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl z-20 overflow-hidden">
                        <div className="p-2">
                          {categoriesWithCount.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.id);
                                setShowCategoryFilter(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                selectedCategory === category.id
                                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                              }`}
                            >
                              <span className="font-medium">{category.name}</span>
                              <span className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                                {category.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-300 font-medium">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="latest" className="bg-gray-800 text-white">Mới nhất</option>
                      <option value="oldest" className="bg-gray-800 text-white">Cũ nhất</option>
                      <option value="popular" className="bg-gray-800 text-white">Nổi bật</option>
                      <option value="readTime" className="bg-gray-800 text-white">Thời gian đọc</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="text-center mb-6 lg:mb-8">
              <p className="text-gray-300">
                Hiển thị <span className="font-bold text-amber-400">{filteredArticles.length}</span> bài viết
                {selectedCategory !== 'all' && (
                  <span> trong danh mục "<span className="font-semibold text-amber-400">{categoriesWithCount.find(c => c.id === selectedCategory)?.name}</span>"</span>
                )}
                {searchTerm && (
                  <span> cho "<span className="font-semibold text-amber-400">{searchTerm}</span>"</span>
                )}
              </p>
            </div>

            {/* Premium Articles Grid */}
            {filteredArticles.length === 0 ? (
              /* Enhanced Empty State */
              <div className="text-center py-16 lg:py-24">
                <div className="mb-8">
                  <div className="relative mx-auto w-24 h-24 lg:w-32 lg:h-32">
                    <svg className="w-full h-full text-gray-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-400 rounded-full animate-bounce opacity-60"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Không có bài viết nào phù hợp với tìm kiếm của bạn. Hãy thử tìm kiếm với từ khóa khác.
                </p>
                
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Xem tất cả bài viết
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {filteredArticles.map((article, index) => (
                  <article 
                    key={article.id}
                    className="group cursor-pointer h-full flex flex-col"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/20 dark:border-gray-700/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] lg:hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 lg:h-56 overflow-hidden">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-xl text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(categoriesWithCount.find(c => c.name === article.category)?.color)}`}>
                            {article.category}
                          </span>
                          {article.featured && (
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">
                              ⭐
                            </span>
                          )}
                        </div>
                        
                        {/* Read Time */}
                        <div className="absolute bottom-3 right-3">
                          <span className="bg-black/60 text-white px-3 py-1 rounded-xl text-xs backdrop-blur-sm">
                            {article.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 lg:p-6 flex-1 flex flex-col">
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-3 text-xs text-gray-600 dark:text-gray-400">
                          <span>{formatDate(article.date)}</span>
                          {article.author && (
                            <span className="font-medium">⌘ {article.author.split(' ').slice(0, 2).join(' ')}</span>
                          )}
                        </div>
                        
                        {/* Title */}
                        <h2 className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex-1">
                          {article.title}
                        </h2>
                        
                        {/* Excerpt */}
                        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 line-clamp-2 lg:line-clamp-3 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        {/* Tags - chỉ hiển thị trên desktop */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="hidden lg:flex flex-wrap gap-1 mb-4">
                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Read More Button */}
                        <button className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors group mt-auto">
                          <span className="text-sm lg:text-base">Đọc thêm</span>
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Premium CTA Section */}
            <div className="text-center mt-16 lg:mt-24">
              <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                  Khám phá thêm về trầm hương
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Tìm hiểu sâu hơn về thế giới trầm hương qua các sản phẩm chất lượng cao
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/products"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Xem sản phẩm
                  </a>
                  <a 
                    href="/contact"
                    className="bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300"
                  >
                    Liên hệ tư vấn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;