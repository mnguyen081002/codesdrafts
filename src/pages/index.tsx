import { useSession } from 'next-auth/react';

import ProtectedPage from '@/components/auth/ProtectedPage';

import Teach from '../components/Teach';
import { Meta } from '../layouts/Meta';
import { Main } from '../templates/Main';

const Index = () => {
  const session = useSession();
  return (
    <div>
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <ProtectedPage>
          <Teach />
        </ProtectedPage>
      </Main>
    </div>
  );
};

export default Index;
