import Logo from './Logo';
import Searchbar from './Searchbar';
import { HomeIcon } from '@heroicons/react/solid';
import Path from './Path';
import { ExploreIcon, HeartIcon, MessengerIcon, PostIcon } from './icons';
import Profile from './Profile';
import { MenuAlt4Icon } from '@heroicons/react/outline';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-5 h-14 gap-5">
      <Logo />
      <Searchbar />
      <div className="flex items-center gap-5">
        <ul className="sm:flex items-center gap-5 hidden">
          <Path Icon={HomeIcon} />
          <Path Icon={MessengerIcon} />
          <Path Icon={PostIcon} />
          <Path Icon={ExploreIcon} />
          <Path Icon={HeartIcon} />
        </ul>
        <MenuAlt4Icon className="w-6 sm:hidden" />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
