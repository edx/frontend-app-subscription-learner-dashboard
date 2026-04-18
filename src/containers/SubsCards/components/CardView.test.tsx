import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CardView } from "./CardView";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }),
    });
});


describe("CardView (Real UI Integration Test)", () => {
    const mockData = [
        {
            id: 1,
            title: "Test Card",
            body: "Test Body Content",
            url: "https://via.placeholder.com/150",
            thumbnail: "https://via.placeholder.com/50",
            hasTag: true,
            tagText: "New",
        },
    ];

    it("renders full card UI without mocks", () => {
        render(
            <CardView data={mockData as any} isLoading={false} isError={false} />
        );

        // container exists
        expect(screen.getByTestId("card-view")).toBeInTheDocument();

        // real DOM content
        expect(screen.getByText("Test Card")).toBeInTheDocument();
        expect(screen.getByText("Test Body Content")).toBeInTheDocument();

        // image exists
        expect(screen.getByRole("img", { name: "Test Card" })).toBeInTheDocument();

        // badge exists
        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("renders loading state using real skeleton", () => {
        render(
            <CardView data={[]} isLoading={true} isError={false} />
        );

        // instead of mocked skeleton
        expect(screen.getByTestId("cardView-loading") || screen.getByText(/loading/i)).toBeTruthy();
    });

    it("renders error alert using real UI", () => {
        render(
            <CardView data={[]} isLoading={false} isError={true} />
        );

        expect(
            screen.getByText(/failed to load data/i)
        ).toBeInTheDocument();
    });
});