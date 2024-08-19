'use client';

import { useState } from 'react';

import HeroStepOne from './HeroStepOne';
import ReturnStep1 from './ReturnStep1';
import ReturnStep2 from './ReturnStep2';
import ReturnStep3 from './ReturnStep3';
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
        {activeSection.step === 1 && (
          <ReturnStep1
            aria={activeSection.aria_attr}
            onStepChange={(step) =>
              setActiveSection(() => ({ aria_attr: 'Return Step 1', step }))
            }
          />
        )}

        {activeSection.step === 2 && (
          <ReturnStep2
            aria={activeSection.aria_attr}
            onStepChange={(step) =>
              setActiveSection(() => ({ aria_attr: 'Return Step 2', step }))
            }
          />
        )}

        {activeSection.step === 3 && (
          <ReturnStep3
            aria={activeSection.aria_attr}
            onStepChange={(step) =>
              setActiveSection(() => ({ aria_attr: 'Return Step 2', step }))
            }
          />
        )}
      </section>
    </Resource>
  );
}
