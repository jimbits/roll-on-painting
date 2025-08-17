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

interface AccordionSection {
  id: string;
  title: string;
  links: MenuLink[];
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

// Main Mobile Menu Component
export const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('residential');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Handle animation timing
  React.useEffect(() => {
    if (isOpen) {
      // First mount the component
      setIsVisible(true);
      // Then trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    } else {
      // Start fade out immediately
      setShouldAnimate(false);
      // Remove from DOM after animation completes
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop - with fade animation */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-1000 ease-in-out ${
          shouldAnimate ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div 
        className={`
          fixed z-50 bg-white shadow-xl flex flex-col
          transition-all duration-1000 ease-in-out
          
          /* Small screens: full screen with fade */
          inset-0 
          ${shouldAnimate ? 'opacity-100' : 'opacity-0'}
          
          /* Medium screens and up: slide from right */
          md:top-0 md:right-0 md:h-full md:w-96 md:inset-auto
          md:transform md:transition-transform md:duration-1000 md:ease-in-out
          ${shouldAnimate ? 'md:translate-x-0' : 'md:translate-x-full'}
          md:opacity-100
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-blue-600 text-white shrink-0">
          <h2 className="text-xl font-bold">Roll On Painting</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
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

// Demo Component with Toggle Button
const MobileMenuDemo: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Header */}
      
        
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
      

     

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default MobileMenuDemo;