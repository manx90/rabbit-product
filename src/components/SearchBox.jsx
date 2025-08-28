import { SearchIcon } from 'lucide-react';
import { RiArrowGoBackFill } from 'react-icons/ri';

import { Category } from '@/api/cateogryApi';
import { Product } from '@/api/productAPI';
import { Column, CommandItem, Row } from '@/lib/css/Product';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox({ className, ctrl }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: products, refetch } = useQuery({
    queryKey: ['search-products', query],
    queryFn: () =>
      Product.getAll({
        q: query,
        limit: 10,
      }),
  });
  const { data: categories, refetch: refetchCategories } = useQuery({
    queryKey: ['search-categories', query],
    queryFn: () => Category.getAll({ q: query, limit: 10 }),
  });

  useEffect(() => {
    refetch();
    refetchCategories();
  }, [query, setQuery]);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        dir='rtl'
        className={cn(
          'shadow-xs inline-flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          className
        )}
        onClick={() => setOpen(!open)}
      >
        <span dir='rtl' className='flex grow items-center'>
          <SearchIcon
            className='-ms-1 me-3 text-muted-foreground/80'
            size={16}
            aria-hidden='true'
          />
          <span className='font-normal text-muted-foreground/70'>بحث ...</span>
        </span>
        <kbd className='-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
          {ctrl ? '⌘K' : 'بحث'}
        </kbd>
      </button>

      <SearchToggle
        className={className}
        open={open}
        setOpen={setOpen}
        products={products}
        categories={categories}
        setQuery={setQuery}
        navigate={navigate}
      />
    </>
  );
}

function SearchToggle({
  className,
  open,
  setOpen,
  products,
  setQuery,
  navigate,
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <div
        className={[
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-100',
          'flex h-screen w-full',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
          className || '',
        ].join(' ')}
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className={[
            'mx-auto my-auto flex h-fit max-h-[800px] w-fit gap-0',
            'transition-all duration-100 will-change-transform',
            open
              ? 'translate-y-0 scale-100 opacity-100'
              : 'translate-y-2 scale-95 opacity-0',
          ].join(' ')}
          role='dialog'
          aria-modal='true'
        >
          <Column className='w-screen gap-0 px-8 lg:w-[450px] lg:px-0'>
            <Row className='gap-0'>
              <button
                className='rounded-tl-lg bg-slate-900 px-2 text-slate-300'
                onClick={() => setOpen(false)}
              >
                <RiArrowGoBackFill className='h-6 w-6' />
              </button>
              <input
                type='text'
                dir='rtl'
                className='h-10 w-full rounded-tr-md bg-slate-900 px-6 text-slate-300 outline-0'
                placeholder='بحث...'
                autoFocus={open}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Row>
            <Column
              dir='rtl'
              className={[
                'custom-scrollbar max-h-[60vh] w-full overflow-y-auto border-t border-slate-700',
                'flex justify-between rounded-b-md bg-slate-900 px-3 text-white',
                'transition-[opacity,transform] duration-100',
                open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
              ].join(' ')}
            >
              <span className='my-2 px-3 font-normal text-muted-foreground/70'>
                المنتجات
              </span>
              {products?.data?.map((product) => (
                <CommandItem
                  key={product.id}
                  className='cursor-pointer dark:hover:bg-slate-700'
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <Row className='justify-between'>
                    <Column>
                      <span>{product.name}</span>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {product.category.name}
                      </span>
                    </Column>
                    <img
                      src={`${
                        import.meta.env.VITE_RABBIT_PI_BASE_URL
                      }/uploads/${product.imgCover}`}
                      alt={product.name}
                      className='h-10 w-10 rounded-sm object-cover'
                    />
                  </Row>
                </CommandItem>
              ))}
              {/* <span className="text-muted-foreground/70 font-normal">
								التصنيفات
							</span>
							{categories?.data?.map(
								(category) => (
									<CommandItem
										key={category.id}
										onClick={() => {
											navigate(
												`/category/${category.id}`,
											);
										}}
									>
										<Row>
											<span>{category.name}</span>
										</Row>
									</CommandItem>
								),
							)} */}
            </Column>
          </Column>
        </div>
      </div>
    </>
  );
}
