import FieldInputGroup from '@/components/elements/input/FieldInputGroup';
import { twMerge } from 'tailwind-merge';

export default function NavbarSearchMobile({ isSearchPopUpOpen }) {
  return (
    <div
      className={twMerge(
        'origin-top transition-all duration-500 ease-in-out sm:hidden absolute top-20 z-50 h-fit  bg-white p-2 text-black right-4 left-4 rounded-md',
        `${
          isSearchPopUpOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 '
        }`
      )}
    >
      <FieldInputGroup />
    </div>
  );
}
