import { render, screen } from '@testing-library/react'
import ResultLanding from '../component/result/ResultLanding.tsx';

test("Example 1 renders successfully", () => {
    render(<ResultLanding/>);

    const element = screen.getByText(/English Premier League/i);

    expect(element).toBeInTheDocument();
})