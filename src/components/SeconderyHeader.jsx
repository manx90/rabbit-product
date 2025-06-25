const SecondaryHeader = () => {
  const categories = [
    { id: 1, name: "ملابس رجالي", href: "/products/mens-clothing" },
    { id: 2, name: "ملابس نسائي", href: "/products/womens-clothing" },
    { id: 3, name: "أطفال", href: "/products/kids" },
    { id: 4, name: "إلكترونيات", href: "/products/electronics" },
  ];

  return (
    <div className="lg:flex hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-row-reverse flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto py-2"
          style={{ height: "40px" }}
        >
          {/* الفلترة والمفضلة */}
          <div className="flex items-center gap-4 ml-4">
            <a
              href="/search"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              الفلترة
            </a>
            <a
              href="/favorites"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              المفضلة
            </a>
          </div>

          <span className="text-gray-500 dark:text-gray-400">|</span>

          <a
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            الرئيسية
          </a>

          {/* التصنيفات */}
          <div className="flex flex-wrap gap-4 justify-start items-center ml-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href={category.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {category.name}
              </a>
            ))}
          </div>

          {/* روابط إضافية */}
          <div className="flex gap-4 justify-between items-center ml-4">
            <a
              href="/privacy"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              سياسة الخصوصية
            </a>
            <a
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              من نحن
            </a>
            <a
              href="/contact"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader;
