'use client';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  FileText,
  Home,
  ImageIcon,
  Menu,
  Palette,
  Phone,
  Settings,
  Star,
  X,
} from 'lucide-react';
import { useState } from 'react';

const residentialLinks = [
  { icon: Home, label: 'Interior Painting', href: '/interior' },
  { icon: Palette, label: 'Exterior Painting', href: '/exterior' },
  { icon: Calculator, label: 'Residential Quick Quote', href: '/quote' },
  { icon: Star, label: 'Reviews', href: '/reviews' },
  { icon: Settings, label: 'Painting Process', href: '/process' },
  { icon: ImageIcon, label: 'Gallery', href: '/gallery' },
  { icon: FileText, label: 'Blog', href: '/blog' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

const commercialLinks = [
  { icon: Home, label: 'Office Painting', href: '/commercial/office' },
  { icon: Palette, label: 'Retail Spaces', href: '/commercial/retail' },
  { icon: Calculator, label: 'Commercial Quote', href: '/commercial/quote' },
  { icon: Star, label: 'Portfolio', href: '/commercial/portfolio' },
  { icon: Settings, label: 'Services', href: '/commercial/services' },
  { icon: ImageIcon, label: 'Projects', href: '/commercial/projects' },
  { icon: FileText, label: 'Resources', href: '/commercial/resources' },
  { icon: Phone, label: 'Get Started', href: '/commercial/contact' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('residential');

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={toggleMenu}
        className='fixed top-4 right-4 z-50 bg-white shadow-md hover:bg-gray-50'
      >
        <Menu className='w-6 h-6' />
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={toggleMenu} />

          {/* Menu Panel */}
          <div className='fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-xl'>
            {/* Header with close button */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
              <h1 className='text-xl font-semibold text-gray-900'>Roll On Painting</h1>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleMenu}
                className='hover:bg-gray-100'
              >
                <X className='w-5 h-5' />
              </Button>
            </div>

            <div className='flex border-b border-gray-200'>
              <button
                onClick={() => setActiveTab('residential')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'residential'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'commercial'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Commercial
              </button>
            </div>

            <div className='flex-1 overflow-y-auto p-4'>
              <div className='grid grid-cols-2 grid-rows-4 gap-4 h-full'>
                {(activeTab === 'residential' ? residentialLinks : commercialLinks).map(
                  (link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      onClick={toggleMenu}
                      className='flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100 min-h-[100px]'
                    >
                      <link.icon
                        className={`w-8 h-8 mb-2 ${activeTab === 'residential' ? 'text-green-600' : 'text-blue-600'}`}
                      />
                      <span className='text-xs font-medium text-gray-900 text-center leading-tight'>
                        {link.label}
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
