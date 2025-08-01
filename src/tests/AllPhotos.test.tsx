import { render, screen, waitFor } from "@testing-library/react";
import { Suspense, useState, useEffect } from "react";
import SkeletonList from "@/views/AllPhotos/components/SkeletonList";
import React from "react";

jest.mock("@/assets/logo.svg", () => "svg-mock");

// Had to mock the PhotosList component because it's a Server Component, which doesn't work with JSDOM
const MockPhotosList = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonList />;
  }

  return <div>Mocked Photos List</div>;
};

describe("AllPhotos", () => {
  it("should render the skeleton while loading and then the photos", async () => {
    render(
      <Suspense fallback={<SkeletonList />}>
        <MockPhotosList />
      </Suspense>
    );

    expect(screen.getByTestId("skeleton-list")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Mocked Photos List")).toBeInTheDocument();
    });
  });
});
