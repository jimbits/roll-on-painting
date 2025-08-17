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
  X
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
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 'exterior-painting',
    label: 'Exterior Painting',
    href: '/residential/exterior',
    icon: <Building className="w-5 h-5" />
  },
  {
    id: 'quick-quote',
    label: 'Residential Quick Quote',
    href: '/residential/quote',
    icon: <Calculator className="w-5 h-5" />
  },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/reviews',
    icon: <Star className="w-5 h-5" />
  },
  {
    id: 'process',
    label: 'Process',
    href: '/process',
    icon: <Clipboard className="w-5 h-5" />
  },
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    icon: <Camera className="w-5 h-5" />
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: <Phone className="w-5 h-5" />
  }
];

const commercialLinks: MenuLink[] = [
  {
    id: 'commercial-interior',
    label: 'Commercial Interior',
    href: '/commercial/interior',
    icon: <Building className="w-5 h-5" />
  },
  {
    id: 'commercial-exterior',
    label: 'Commercial Exterior',
    href: '/commercial/exterior',
    icon: <Brush className="w-5 h-5" />
  },
  {
    id: 'commercial-quote',
    label: 'Commercial Quote',
    href: '/commercial/quote',
    icon: <Calculator className="w-5 h-5" />
  },
  {
    id: 'commercial-projects',
    label: 'Project Gallery',
    href: '/commercial/projects',
    icon: <Camera className="w-5 h-5" />
  },
  {
    id: 'maintenance',
    label: 'Maintenance Plans',
    href: '/commercial/maintenance',
    icon: <Clipboard className="w-5 h-5" />
  },
  {
    id: 'commercial-contact',
    label: 'Commercial Contact',
    href: '/commercial/contact',
    icon: <Phone className="w-5 h-5" />
  }
];

// Menu Link Component
const MenuLink: React.FC<{ link: MenuLink; onClick?: () => void }> = ({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg mx-2"
  >
    <div className="text-blue-600">
      {link.icon}
    </div>
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
      className="w-full flex items-center justify-between px-4 py-4 text-left font-semibold text-gray-800 hover:text-blue-600 transition-colors"
    >
      <span>{title}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5" />
      ) : (
        <ChevronDown className="w-5 h-5" />
      )}
    </button>
    
    {isOpen && (
      <div className="pb-2">
        {links.map((link) => (
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
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
          shouldAnimate ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div 
        className={`
          fixed z-50 bg-white shadow-xl flex flex-col
          transition-all duration-300 ease-in-out
          
          /* Small screens: full screen with fade */
          inset-0 
          ${shouldAnimate ? 'opacity-100' : 'opacity-0'}
          
          /* Medium screens and up: slide from right */
          md:top-0 md:right-0 md:h-full md:w-96 md:inset-auto
          md:transform md:transition-transform md:duration-300 md:ease-in-out
          ${shouldAnimate ? 'md:translate-x-0' : 'md:translate-x-full'}
          md:opacity-100
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-linear-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shrink-0">
          <h2 className="text-xl font-bold">Roll On Painting</h2>
          <button
            onClick={onClose}
            className="p-2  rounded-lg transition-colors text-white"
          >
            <X className="w-6 h-6" />
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
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <p className="text-sm text-gray-600 text-center">
            Professional Painting Services
          </p>
        </div>
      </div>
    </>
  );
};

// Hamburger Button Component
const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
    aria-label="Open navigation menu"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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