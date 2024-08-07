import { facebook, instagram, twitter } from '../assets/icons';

export const data = {
  navLinks: [
    { href: { path: '/' }, label: 'HOME' },
    { href: { path: '/about' }, label: 'ABOUT US' },
    { href: { path: '/services' }, label: 'SERVICES' },
    { href: { path: '/contacts' }, label: 'CONTACTS' },
    { href: { path: '/products' }, label: 'PRODUCTS' },
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
        { name: 'zionet@info.com', link: 'mailto:zionet@info.com' },
        { name: '+255712928450', link: 'tel:+255712928450' },
      ],
    },
  ],

  socialMedia: [
    { src: facebook, alt: 'facebook logo' },
    { src: twitter, alt: 'twitter logo' },
    { src: instagram, alt: 'instagram logo' },
  ],
};
