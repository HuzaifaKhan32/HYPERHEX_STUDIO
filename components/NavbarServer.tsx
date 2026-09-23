// Server Component - Static navbar shell
// Client components handle animations and interactivity

import Button3D from './Button3D';
import NavbarAnimatedWrapper from './NavbarAnimatedWrapper';
import NavbarLogoHover from './NavbarLogoHover';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarMobileMenu from './NavbarMobileMenu';

const links = [
  { id: 'home',              label: 'Home',              href: '/'               },
  { id: 'services',          label: 'Services',          href: '/services'       },
  { id: 'works',             label: 'Works',             href: '/projects'       },
  { id: 'featured-projects', label: 'Featured Projects', href: '/featured-projects' },
];

export default function NavbarServer() {
  return (
    <NavbarAnimatedWrapper>
      {/* Logo with hover animation */}
      <NavbarLogoHover />

      {/* Desktop navigation with active state */}
      <NavbarDesktopLinks links={links} />

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Contact button - desktop only */}
        <div className="hidden md:flex">
          <Button3D href="/contact">
            Contact Us
          </Button3D>
        </div>

        {/* Mobile menu - includes hamburger + drawer */}
        <NavbarMobileMenu links={links} />
      </div>
    </NavbarAnimatedWrapper>
  );
}
