import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo, useState} from 'react';
import {CartForm} from '@shopify/hydrogen';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Input} from '~/components/Input';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && (
          <Header 
            title="UNCMFRT.COM"
            menu={{
              items: [
                { id: 'science', title: 'Science', to: '/science', target: '_self' },
                { id: 'shop', title: 'Shop', to: '/shop', target: '_self' },
                { id: 'podcasts', title: 'Podcasts', to: '/podcasts', target: '_self' },
                { id: 'trainers', title: 'Trainers', to: '/trainers', target: '_self' },
                { id: 'blog', title: 'Blog', to: '/blog', target: '_self' },
              ]
            }} 
          />
        )}
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer 
      open={isOpen} 
      onClose={onClose} 
      heading={null}
      openFrom="right"
      className="bg-white !p-0"
    >
      <div className="overflow-auto h-full">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="right" heading="Menu">
      <div className="grid gap-4 p-6 md:gap-8 md:p-8 h-screen bg-[#1B1F23]">
        <nav className="grid gap-4 grid-flow-row">
          {(menu?.items || []).map((item) => (
            <Link
              key={item.id}
              to={item.to}
              target={item.target}
              className="text-xl md:text-2xl font-medium text-white hover:text-white/70 py-2 border-b border-white/10"
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
          <button 
            className="mt-8 bg-white text-[#1B1F23] px-4 py-3 rounded-md text-lg font-medium"
            onClick={onClose}
          >
            Take The Quiz
          </button>
        </nav>
      </div>
    </Drawer>
  );
}

function DesktopHeader({isHome, menu, openCart, openMenu, title}: {
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  return (
    <header
      role="banner"
      className={`
        fixed top-4 left-0 right-0 mx-auto 
        max-w-7xl bg-white/95 backdrop-blur-sm
        border border-gray-200 
        flex items-center h-16 
        px-4 sm:px-6 lg:px-8 
        rounded-lg
        z-50 transition-all duration-300
        shadow-sm
      `}
    >
      <div className="flex w-full items-center justify-between">
        {/* Logo y Menú Móvil */}
        <div className="flex items-center gap-4">
          <button
            onClick={openMenu}
            className="block lg:hidden text-black hover:text-black/70 transition-colors"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="text-black font-bold text-lg">
            {title}
          </Link>
        </div>

        {/* Menú Principal - Solo visible en desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {(menu?.items || []).map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  target={item.target}
                  className="text-black hover:text-black/70 text-sm lg:text-base"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            className="hidden sm:block bg-[#1B1F23] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium whitespace-nowrap"
          >
            Take The Quiz
          </button>
          <Link to="/account" className="hidden sm:block">
            <img 
              src="/assets/Usericon.svg" 
              alt="User account" 
              className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]"
            />
          </Link>
          <button 
            onClick={openCart}
            className="relative flex items-center justify-center"
          >
            <img 
              src="/assets/Carshopping.svg" 
              alt="Shopping cart" 
              className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]"
            />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
              ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
              : 'text-contrast bg-primary'
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Newsletter Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-black mb-4">Be a Part of Our Journey</h3>
          <p className="text-gray-600 mb-6">
            Welcome to UNCMFRT. Sign up for exclusive content and we'll send you 10% off.
          </p>
          <div className="flex gap-4 max-w-md">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-black/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Us Column */}
          <div>
            <h4 className="font-bold text-black mb-4">About Us</h4>
            <ul className="space-y-3">
              <li><a href="/blog" className="text-gray-600 hover:text-black">Blog</a></li>
              <li><a href="/reviews" className="text-gray-600 hover:text-black">Product Reviews</a></li>
              <li><a href="/our-story" className="text-gray-600 hover:text-black">Our Story</a></li>
              <li><a href="/delivery" className="text-gray-600 hover:text-black">Delivery</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-black mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="/order-status" className="text-gray-600 hover:text-black">Order Status</a></li>
              <li><a href="/help" className="text-gray-600 hover:text-black">Help Center</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-black">Contact Us</a></li>
              <li><a href="/returns" className="text-gray-600 hover:text-black">Returns</a></li>
            </ul>
          </div>

          {/* Important Link Column */}
          <div>
            <h4 className="font-bold text-black mb-4">Important Link</h4>
            <ul className="space-y-3">
              <li><a href="/maintenance" className="text-gray-600 hover:text-black">Maintenance</a></li>
              <li><a href="/warranty" className="text-gray-600 hover:text-black">Warranty</a></li>
              <li><a href="/canadian-customers" className="text-gray-600 hover:text-black">Canadian Customers</a></li>
              <li><a href="/setup" className="text-gray-600 hover:text-black">Setup</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-black mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
              <li><a href="/accessibility" className="text-gray-600 hover:text-black">Accessibility</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-black">Terms of Service</a></li>
              <li><a href="/affiliate" className="text-gray-600 hover:text-black">Affiliate Program</a></li>
              <li><a href="/articles" className="text-gray-600 hover:text-black">Articles</a></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h4 className="font-bold text-black mb-4">Contact Us</h4>
            <p className="text-gray-600 mb-2">Let Us Help You</p>
            <p className="text-2xl font-bold text-black mb-6">(888) 860-0572</p>
            <h4 className="font-bold text-black mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-black hover:text-black/70">
                <img src="/assets/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="text-black hover:text-black/70">
                <img src="/assets/twitter.svg" alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="#" className="text-black hover:text-black/70">
                <img src="/assets/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="text-black hover:text-black/70">
                <img src="/assets/youtube.svg" alt="YouTube" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-gray-200 mt-16 text-gray-600">
          <p>© uncmfrt.com. All right reserved.</p>
          <p>Made with ❤️ and ☕ by Arctic Grey</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
