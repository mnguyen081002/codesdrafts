import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import Teach from '../components/Teach';

const Index = () => {
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
        <Teach />
      </Main>
    </div>
  );
};

export default Index;
