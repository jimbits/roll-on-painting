'use client';
import React, { useState } from 'react';
import {
  Home,
  Brush,
  Building,
  Calculator,
  Star,
  Clipboard,
  Camera,
  FileText,
  Phone,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';

// Types
interface MenuLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Menu Data
const residentialLinks: MenuLink[] = [
  {
    id: 'interior-painting',
    label: 'Interior Painting',
    href: '/residential/interior',
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 'exterior-painting',
    label: 'Exterior Painting',
    href: '/residential/exterior',
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 'quick-quote',
    label: 'Residential Quick Quote',
    href: '/residential/quote',
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/reviews',
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: 'process',
    label: 'Process',
    href: '/process',
    icon: <Clipboard className="h-5 w-5" />,
  },
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    icon: <Camera className="h-5 w-5" />,
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: <Phone className="h-5 w-5" />,
  },
];

const commercialLinks: MenuLink[] = [
  {
    id: 'commercial-interior',
    label: 'Commercial Interior',
    href: '/commercial/interior',
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 'commercial-exterior',
    label: 'Commercial Exterior',
    href: '/commercial/exterior',
    icon: <Brush className="h-5 w-5" />,
  },
  {
    id: 'commercial-quote',
    label: 'Commercial Quote',
    href: '/commercial/quote',
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    id: 'commercial-projects',
    label: 'Project Gallery',
    href: '/commercial/projects',
    icon: <Camera className="h-5 w-5" />,
  },
  {
    id: 'maintenance',
    label: 'Maintenance Plans',
    href: '/commercial/maintenance',
    icon: <Clipboard className="h-5 w-5" />,
  },
  {
    id: 'commercial-contact',
    label: 'Commercial Contact',
    href: '/commercial/contact',
    icon: <Phone className="h-5 w-5" />,
  },
];

// Menu Link Component
const MenuLink: React.FC<{ link: MenuLink; onClick?: () => void }> = ({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
  >
    <div className="text-blue-600">{link.icon}</div>
    <span className="font-medium">{link.label}</span>
  </a>
);

// Accordion Component
const MenuAccordion: React.FC<{
  title: string;
  links: MenuLink[];
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
}> = ({ title, links, isOpen, onToggle, onLinkClick }) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold text-gray-800 transition-colors hover:text-blue-600"
    >
      <span>{title}</span>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>

    {isOpen && (
      <div className="pb-2">
        {links.map(link => (
          <MenuLink key={link.id} link={link} onClick={onLinkClick} />
        ))}
      </div>
    )}
  </div>
);

// Mobile Menu Component
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('residential');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Handle animation timing
  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    } else {
      setShouldAnimate(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          shouldAnimate ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`/* Small screens: full screen with fade */ fixed inset-0 z-50 flex flex-col bg-white shadow-xl transition-all duration-300 ease-in-out ${shouldAnimate ? 'opacity-100' : 'opacity-0'} /* Medium screens and up: slide from right */ md:inset-auto md:top-0 md:right-0 md:h-full md:w-96 md:transform md:transition-transform md:duration-300 md:ease-in-out ${shouldAnimate ? 'md:translate-x-0' : 'md:translate-x-full'} md:opacity-100`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-linear-to-tr from-blue-700 via-blue-600 to-indigo-600 px-4 py-4 text-white">
          <h2 className="text-xl font-bold">Roll On Painting</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white transition-colors"
          >
            <X className="h-6 w-6" /> <span>x</span>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Residential Accordion */}
          <MenuAccordion
            title="Residential"
            links={residentialLinks}
            isOpen={openAccordion === 'residential'}
            onToggle={() => toggleAccordion('residential')}
            onLinkClick={onClose}
          />

          {/* Commercial Accordion */}
          <MenuAccordion
            title="Commercial"
            links={commercialLinks}
            isOpen={openAccordion === 'commercial'}
            onToggle={() => toggleAccordion('commercial')}
            onLinkClick={onClose}
          />
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-200 bg-gray-50 p-4">
          <p className="text-center text-sm text-gray-600">Professional Painting Services</p>
        </div>
      </div>
    </>
  );
};

// Hamburger Button Component
const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 text-gray-600 transition-colors hover:text-blue-600"
    aria-label="Open navigation menu"
  >
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

// Complete Mobile Menu with Button (Main Export)
const MobileMenuWithButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MobileMenuButton onClick={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export { MobileMenu, MobileMenuButton };
export default MobileMenuWithButton;
