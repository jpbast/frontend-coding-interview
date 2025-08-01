import { render, screen } from "@testing-library/react";
import PhotoItem from "@/views/AllPhotos/components/PhotoItem";
import { PexelsPhoto } from "@/types/api";

jest.mock("@/assets/links.svg", () => "svg-mock");
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

const mockPhoto: PexelsPhoto = {
  id: 1,
  width: 100,
  height: 100,
  url: "photo-url",
  photographer: "John Doe",
  photographer_url: "portfolio-url",
  photographer_id: 1,
  avg_color: "#7E7F7F",
  src: {
    original: "img-url",
    large2x: "img-url",
    large: "img-url",
    medium: "img-url",
    small: "img-url",
    portrait: "img-url",
    landscape: "img-url",
    tiny: "img-url",
  },
  liked: false,
  alt: "Photo title",
};

describe("PhotoItem", () => {
  it("should render the photo information correctly", () => {
    render(<PhotoItem photo={mockPhoto} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Photo title")).toBeInTheDocument();
    expect(screen.getByText("#7E7F7F")).toBeInTheDocument();

    const portfolioLink = screen.getByRole("link", { name: /portfolio/i });
    expect(portfolioLink).toHaveAttribute("href", "portfolio-url");

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "img-url");
    expect(image).toHaveAttribute("alt", "Photo title");
  });
});
