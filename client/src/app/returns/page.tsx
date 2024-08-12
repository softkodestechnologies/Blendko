'use client';

import { useState } from 'react';

import HeroStepOne from './HeroStepOne';
import ReturnStep1 from './ReturnStep1';
import Resource from '@/components/layouts/resource_links/Resource';

export default function Returns() {
  const [activeSection, setActiveSection] = useState({
    aria_attr: 'Return Step 1',
    step: 1,
  });

  return (
    <Resource
      hero={
        <>
          <HeroStepOne step={activeSection.step} />
        </>
      }
    >
      <section>
        <ReturnStep1
          aria={activeSection.aria_attr}
          onStepChange={(step) =>
            setActiveSection((prev) => ({ ...prev, step }))
          }
        />
      </section>
    </Resource>
  );
}
