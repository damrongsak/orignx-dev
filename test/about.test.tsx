// tests/about.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '../app/about/page';

describe('AboutPage Component', () => {
    it('should render the "About Me" text', () => {
        render(<AboutPage />);
        const aboutText = screen.getByText('About Me');
        expect(aboutText).toBeInTheDocument();
    });
});