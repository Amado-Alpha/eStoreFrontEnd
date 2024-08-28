import { facebook, instagram, twitter } from '../assets/icons';

export const data = {
  services: [
    {
      id: 1,
      title: '3D Printing',
      icon: 'fas fa-print',
      description:
        'High-quality 3D printing services for prototypes, parts, and products with precision and efficiency.',
    },
    {
      id: 2,
      title: 'Software Development',
      icon: 'fas fa-laptop',
      description:
        'Custom software solutions tailored to meet your business needs and drive innovation.',
    },
    {
      id: 3,
      title: 'Circuit Design and Development',
      icon: 'fas fa-microchip',
      description:
        'Innovative circuit design and development services to bring your electronic projects to life.',
    },
    {
      id: 4,
      title: 'Computer Maintenance and Repair',
      icon: 'fas fa-tools',
      description:
        'Comprehensive maintenance and repair services to keep your computers running smoothly.',
    },
    {
      id: 5,
      title: 'Tech Consultancy',
      icon: 'fas fa-user-tie',
      description:
        'Expert tech consultancy services to help you make informed decisions and stay ahead of the curve.',
    },
    {
      id: 6,
      title: 'Selling of Electronic Devices',
      icon: 'fas fa-laptop',
      description:
        'Wide range of electronic devices for sale, from the latest gadgets to essential tech tools.',
    },
  ],
  projects: [
    {
      title: 'Automated Car',
      description:
        'An innovative project showcasing an automated car capable of navigating through predefined routes with minimal human intervention. This project leverages advanced technologies to enhance driving efficiency and safety.',
      rating: 5,
      features: [
        'Innovative and cutting-edge technology',
        'Efficient and user-friendly design',
        'Seamless integration with existing systems',
      ],
      imageUrl:
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_tpcOWxyxnK5xABlSFZSLYQBqYs0amBx9GADOcnR6KqZbGd81NfOtd_K3Djdf4rtptrSJEp0cYnzW00KHEJ6z506aQNKBN3I6jiEKGOBMUpZFS6FZOt7Gy6LudX4caYyMwYaZyEFrZG4/s1600/20471483357907.jpg',
    },
    {
      title: 'Water Dispenser',
      description:
        'A smart water dispenser that provides instant access to clean drinking water. This project integrates IoT and cloud technologies to ensure reliable and efficient water dispensing.',
      rating: 4,
      features: [
        'Instant access to clean drinking water',
        'Integration with IoT and cloud technologies',
        'Reliable and efficient water dispensing',
      ],
      imageUrl:
        'https://circuitdigest.com/sites/default/files/inlineimages/u/Automatic-Water-Dispenser-using-Arduino-in-action.jpg',
    },
    {
      title: 'Smart Waste Bin',
      description:
        'A modern waste management solution featuring a smart bin that automatically sorts waste. This project aims to promote environmental sustainability through intelligent waste disposal.',
      rating: 4,
      features: [
        'Automated waste sorting',
        'Promotes environmental sustainability',
        'Intelligent waste disposal',
      ],
      imageUrl:
        'https://hackster.imgix.net/uploads/attachments/1600475/_GcIvnFXZzP.blob?auto=compress&w=1600&h=1200&fit=min&fm=jpg',
    },
  ],

  testimonials: [
    {
      quote: 'This service is amazing. Highly recommend!',
      name: 'John Doe',
      position: 'CEO, Company Inc.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvk8JXZ54_NSS6v6ByvSbeA6W_tYQkRglv_w&s',
    },
    {
      quote: 'Fantastic experience. Will use again.',
      name: 'Jane Smith',
      position: 'Marketing Manager, Business Co.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s',
    },
    {
      quote:
        'I trusted MeckTonix with my project and i never regret doing that, my project grade attests to this.',
      name: 'Alice Brown',
      position: 'Developer, Tech Solutions',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUGStslkW8XpFkAVnQD0QcSz4MEZXZmjEwg&s',
    },
    {
      quote:
        "The devices i bought were highly reliable, didn't have to do any maintenace for a year or so.",
      name: 'Jane Smith',
      position: 'Marketing Manager, Business Co.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s',
    },
    {
      quote:
        'I am happy i found Mecktonix, almost all of electronics problems are resolved.',
      position: 'Developer, Tech Solutions',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUGStslkW8XpFkAVnQD0QcSz4MEZXZmjEwg&s',
    },
    {
      quote: 'Fantastic experience. Will use again.',
      name: 'Genana Elly',
      position: 'Marketing Manager, Business Co.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUGStslkW8XpFkAVnQD0QcSz4MEZXZmjEwg&s',
    },
    {
      quote:
        'This is a longer testimonial to test the height of the slides. The content should not make the slides uneven.',
      name: 'Mireya Elly',
      position: 'Developer, Tech Solutions',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s',
    },
  ],

  products: [
    {
      id: 1,
      name: 'Arduino UNO',
      description: 'Microcontroller device.',
      price: '35000.00',
      imageUrl:
        'https://store.arduino.cc/cdn/shop/products/A000066_01.iso_934x700.jpg?v=1629815860',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Ultrasonic sensor',
      description: 'Distance sensor.',
      price: '10000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/612VzpvhpjL._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 4,
      name: 'Macbook Pro ',
      description: 'Amazing graphics capability',
      price: '912000.00',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxbnnYI5gEzdNPzoD_GBR2L5JBPzBTCiTjhg&s',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Computers',
    },
    {
      id: 5,
      name: 'Dell inspiron',
      description: 'Robust design',
      price: '820000.00',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TdVxy7gAD_rzuI6NjlCY9voPOdQu_r0PBw&s',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Computers',
    },
    {
      id: 6,
      name: 'Coin acceptor',
      description: 'Programmable acceptor.',
      price: '90000',
      imageUrl: 'https://cdn.sparkfun.com/assets/parts/7/6/9/6/11636-01.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 7,
      name: 'pH sensor',
      description: 'pH measuring calibrated sensor.',
      price: '85000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/413J1PM5ueL._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 8,
      name: 'Crimping tool',
      description: 'UTP termination tool.',
      price: '45000.00',
      imageUrl:
        'https://intellinetsolutions.com/cdn/shop/products/universal-modular-plug-crimping-tool-211048-1_aefec92a-7edb-49b1-92bb-fa06e1389ed7.jpg?v=1678692447',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Tools',
    },
    {
      id: 9,
      name: 'Node MCU',
      description: 'Wireless card.',
      price: '20000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Electronics',
    },
    {
      id: 1,
      name: 'Arduino UNO',
      description: 'Microcontroller device.',
      price: '35000.00',
      imageUrl:
        'https://store.arduino.cc/cdn/shop/products/A000066_01.iso_934x700.jpg?v=1629815860',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Node MCU',
      description: 'Wireless card.',
      price: '20000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Ultrasonic sensor',
      description: 'Distance sensor.',
      price: '10000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/612VzpvhpjL._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 4,
      name: 'Servo Motor',
      description: 'converts electrical power into mechanical power.',
      price: '12000.00',
      imageUrl:
        'https://circuitdigest.com/sites/default/files/field/image/Servo-Motor.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 5,
      name: 'Node MCU',
      description: 'Wireless card.',
      price: '20000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Electronics',
    },
    {
      id: 6,
      name: 'Coin acceptor',
      description: 'Programmable acceptor.',
      price: '90000.00',
      imageUrl: 'https://cdn.sparkfun.com/assets/parts/7/6/9/6/11636-01.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 7,
      name: 'pH sensor',
      description: 'pH measuring calibrated sensor.',
      price: '85000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/413J1PM5ueL._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Sensors',
    },
    {
      id: 8,
      name: 'Crimping tool',
      description: 'UTP termination tool.',
      price: '45000.00',
      imageUrl:
        'https://intellinetsolutions.com/cdn/shop/products/universal-modular-plug-crimping-tool-211048-1_aefec92a-7edb-49b1-92bb-fa06e1389ed7.jpg?v=1678692447',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Tools',
    },
    {
      id: 9,
      name: 'Node MCU',
      description: 'Wireless card.',
      price: '20000.00',
      imageUrl:
        'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
      whatsapp: '1234567890',
      phone: '1234567890',
      category: 'Electronics',
    },
  ],

  navLinks: [
    { href: { path: '/' }, label: 'Home' },
    { href: { path: '/about' }, label: 'About Us' },
    { href: { path: '/services' }, label: 'Services' },
    { href: { path: '/contacts' }, label: 'Contacts' },
    { href: { path: '/products' }, label: 'Products' },
    // { href: { path: "/ContactUs", hash: "#contact-us" }, label: "Contact Us" },
  ],

  carouselText: [
    { text: 'We provide the best tech. solutions, you can rely on us' },
    { text: 'We provide the best tech. solutions, you can rely on us' },
    { text: 'We provide the best tech. solutions, you can rely on us' },
    { text: 'We provide the best tech. solutions, you can rely on us' },
  ],

  footerLinks: [
    {
      title: 'Services',
      links: [
        { name: 'Network installation', link: '/' },
        { name: 'IT Support', link: '/' },
        { name: 'Camera installation', link: '/' },
        { name: 'ICT shop', link: '/' },
        { name: 'Wi-Fi', link: '/' },
        { name: 'ISP', link: '/' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'About us', link: '/' },
        { name: 'FAQs', link: '/' },
        { name: 'How it works', link: '/' },
        { name: 'Privacy policy', link: '/' },
        { name: 'Payment policy', link: '/' },
      ],
    },
    {
      title: 'Get in touch',
      links: [
        { name: 'company@info.com', link: 'mailto:company@info.com' },
        { name: '+123456789', link: 'tel:+1234567890' },
      ],
    },
  ],

  socialMedia: [
    { src: facebook, alt: 'facebook logo' },
    { src: twitter, alt: 'twitter logo' },
    { src: instagram, alt: 'instagram logo' },
  ],
};
