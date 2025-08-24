interface ServiceData {
  uid: string;
  type: string;
  image: ServiceImage;
  shortDescription: string;
  linkUrl: string;
}

interface ServiceImage {
  url: string;
  width: number;
  height: number;
}

const serviceData = [
  {
    uid: 'a1ddd3c2',
    type: 'Core Interior Painting Services',

    image: {
      url: 'surface-prep.jpg',
      width: 600,
      height: 400,
      alt: 'Metallic Door Painted Yellow',
    },

    shortDescription:
      'Our residential exterior painting services cover all home types, from single-story ranch homes to expansive multi-story properties. We specialize in siding painting and restoration for every material, including vinyl siding, wood siding, fiber cement, and aluminum surfaces. Our multi-story house painting expertise includes professional scaffolding and safety equipment to safely reach every surface of your home.',
    linkUrl: '/services/interior-house-painting-services',
  },
  {
    uid: 'b3dsdda9',
    type: 'House Painting & Siding',
    image: {
      url: 'exterior-home-south-edmoton.jpg',
      width: 1200,
      height: 667,
      alt: 'exterior home in south edmoton having siding painted by roll on paint proffessionals',
    },
    shortDescription:
      "We provide Edmonton homeowners with expert deck and fence painting services using premium weather-resistant finishes designed to withstand Edmonton's harsh winters and UV exposure in summer. Our garage door painting specialists enhance your home's entrance appeal and curb value with precision application techniques. Additionally, our foundation and basement exterior painting services protect these critical areas from Edmonton's freeze-thaw cycles while improving your property's overall appearance.",
    linkUrl: 'pouring-paint.jpg',
  },
  {
    uid: 'b3e7f5a9',
    type: 'Specialized Surface Painting',
    image: {
      url: 'specialty-surfaces.jpg',
      width: 800,
      height: 799,
      alt: 'Metallic Door Painted Yellow',
    },
    shortDescription:
      'Our residential exterior painting services cover all home types, from single-story ranch homes to expansive multi-story properties. We specialize in siding painting and restoration for every material, including vinyl siding, wood siding, fiber cement, and aluminum surfaces. Our multi-story house painting expertise includes professional scaffolding and safety equipment to safely reach every surface of your home. ',
    linkUrl: 'pouring-paint.jpg',
  },
  {
    uid: 'dsdf2e4gadfsg',
    type: 'Protective Coatings & Finishes',
    image: {
      url: 'protective-coatings.webp',
      width: 600,
      height: 400,
      alt: 'Metallic Door Painted Yellow',
    },
    shortDescription:
      "Edmonton homes are  subjected to some harsh  conditions. To help protect your home we offer premium products that withstand Edmonton's intense UV summers and frigid winters. We apply  waterproof coatings,  anti-rust treatments for metal surfaces and fixtures to prevent corrosion damage protective wood coatings stain and seal to for decks fences and wooden buildings to provide UV protection and weather resistance.",
    linkUrl: 'pouring-paint.jpg',
  },
  {
    uid: 'bdsf2w5a9',
    type: 'Restorations',
    image: {
      url: 'protective-coatings.webp',
      width: 600,
      height: 400,
      alt: 'Metallic Door Painted Yellow',
    },
    shortDescription:
      "Proper preparation is the foundation of any lasting exterior paint job. Our comprehensive power washing and surface cleaning services remove dirt, mildew, and chalky residue to ensure optimal paint adhesion in Edmonton's challenging climate. We also clean repair and replace siding and trim damaged caused by Edmonton's freeze-thaw cycles. We  caulk and seal all surfaces and use waterproofing coatings to seal gaps to prevent moisture infiltration.",
    linkUrl: 'pouring-paint.jpg',
  },
  {
    uid: 'bdsf2w5a9',
    type: 'Core Painting Services',
    image: {
      url: 'protective-coatings.webp',
      width: 600,
      height: 400,
      alt: 'Metallic Door Painted Yellow',
    },
    shortDescription:
      "Proper preparation is the foundation of any lasting exterior paint job. Our comprehensive power washing and surface cleaning services remove dirt, mildew, and chalky residue to ensure optimal paint adhesion in Edmonton's challenging climate. We also clean repair and replace siding and trim damaged caused by Edmonton's freeze-thaw cycles. We  caulk and seal all surfaces and use waterproofing coatings to seal gaps to prevent moisture infiltration.",
    linkUrl: 'pouring-paint.jpg',
  },
];

const serviceDataBackup = [
  {
    uid: 'a1f9d3c2',
    type: 'Surface Preparation',
    image: 'sanding-wall-surface-prep.png',
    shortDescription:
      "Everything starts with a clean surface preparation. Our team cleans walls and ceilings, sands rough spots, fills cracks and holes, seals gaps with caulking, and applies primer to ensure smooth, durable, and professional paint results that enhance your home's beauty and value.",
    linkUrl: '/services/interior-house-painting-services',
  },
  {
    uid: 'b3e7f5a9',
    type: 'Home Exterior Painting Services',
    image: 'house-exterior-image',
    shortDescription:
      'Expert exterior house painting services in Edmonton that boost curb appeal, protect siding, and increase property value.',
    linkUrl: 'pouring-paint.jpg',
  },
  {
    uid: 'c4d8a2f6',
    type: 'Specialty Finishes',
    image: 'faux-finish-image',
    shortDescription:
      'From textured painting and color washing to metallic or gloss effects, stenciling, and custom murals, we deliver unique, high-quality results that transform your walls and elevate your space. ',
    linkUrl: '/services/faux-finishes',
  },
  {
    uid: 'd7f1e9b2',
    type: 'Air Less Sprays',
    image: 'spray-gun-image',
    shortDescription:
      'Airless spray painting services in Edmonton for smooth, even finishes on walls, ceilings, and large surface areas.',
    linkUrl: '/services/air-less-sprays',
  },
  {
    uid: 'e6b2c8d4',
    type: 'HVLP Spraying',
    image: 'hvlp-spray-image',
    shortDescription:
      'HVLP spraying in Edmonton with precision paint application for cabinets, furniture, and fine surfaces.',
    linkUrl: '/services/hvlp-spraying',
  },
  {
    uid: 'f9a3d7e1',
    type: 'Wood Refinishing',
    image: 'wood-refinish-image',
    shortDescription:
      'Wood refinishing services in Edmonton to restore beauty, durability, and natural character to your wood surfaces.',
    linkUrl: '/services/wood-refinishing',
  },
  {
    uid: 'g2e8c6f5',
    type: 'drywall repairs',
    image: 'drywall-repair-image',
    shortDescription:
      'Trusted drywall repair services in Edmonton. Roll On Painting fixes cracks, holes, and damage with seamless results.',
    linkUrl: '/services/drywall-repairs',
  },
  {
    uid: 'h4c9a7d2',
    type: 'Power Washing',
    image: 'power-wash-image',
    shortDescription:
      'Power washing services in Edmonton to clean siding, decks, driveways, and prep surfaces for painting.',
    linkUrl: '/services/power-washing',
  },
  {
    uid: 'i5d6b8f3',
    type: 'Drywall Installation',
    image: 'drywall-install-image',
    shortDescription:
      'Professional drywall installation in Edmonton. Smooth, durable walls and ceilings ready for painting or finishing.',
    linkUrl: '/services/drywall-installation',
  },
  {
    uid: 'j7f2c4a8',
    type: 'Poppcorn Cielings',
    image: 'ceiling-texture-image',
    shortDescription:
      'Popcorn ceiling repair and refinishing in Edmonton. Modernize and refresh your home’s ceilings with expert service.',
    linkUrl: '/services/poppcorn-cielings',
  },
];

const singleService = serviceData[0];

export { type ServiceData };
export { serviceData, singleService };
