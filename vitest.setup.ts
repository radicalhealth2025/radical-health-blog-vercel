import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);
