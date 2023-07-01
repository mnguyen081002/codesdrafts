import Footer from '../Footer';
import HeaderInstructor from './Header';
import SideBarInstructor from './Sidebar';

const InstructorLayout = ({ children }) => {
  return (
    <>
      <HeaderInstructor />
      <div className="flex w-full">
        <SideBarInstructor />
        {children}
      </div>
      <Footer />
    </>
  );
};

export { HeaderInstructor, InstructorLayout };
