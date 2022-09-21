import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, vi } from "vitest";
import { Context as ResponsiveContext } from "react-responsive";
import { Filter, PRICE_OPTIONS } from ".";
import { ReactNode } from "react";
import { useFilter } from "@hooks";
import { useGetFilterValues } from "@codegen/page";

const mockedFilterValuesReturn = {
  allProducts: {
    edges: [
      {
        node: {
          brand: "Starbucks",
          weight: 0.25,
          coffee_strength: 2,
        },
      },
      {
        node: {
          brand: "Jurado",
          weight: 1,
          coffee_strength: 1,
        },
      },
    ],
  },
};

vi.mock("@src/graphql/generated/graphql", () => ({
  useGetFilterValuesQuery: vi.fn(() => ({
    data: mockedFilterValuesReturn,
  })),
}));

vi.mock("@src/hooks/useFilter", () => ({
  useFilter: vi.fn(() => ({
    priceLimits: {
      min: null,
      max: null,
    },
    brand: null,
    weight: null,
    coffeeStrength: null,
  })),
}));

describe("Filter component", () => {
  const withMobile = (component: ReactNode) => (
    <ResponsiveContext.Provider value={{ width: 600 }}>
      {component}
    </ResponsiveContext.Provider>
  );
  it("should render correctly", () => {
    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);

    mockedFilterValuesReturn.allProducts.edges.forEach(
      ({ node: { brand, coffee_strength, weight } }) => {
        expect(screen.getAllByText(brand).length).toBeGreaterThanOrEqual(1);
        expect(
          screen.getAllByText(coffee_strength).length
        ).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(weight).length).toBeGreaterThanOrEqual(1);
      }
    );
    PRICE_OPTIONS.forEach(({ max, min }, index) => {
      switch (max) {
        case null:
          expect(screen.getByText(`More then ${min}`)).toBeInTheDocument();
          break;
        default:
          expect(screen.getByText(`${min} - ${max}`)).toBeInTheDocument();
      }
    });
    expect(screen.getAllByText("All")).toHaveLength(3);
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.queryByText("Brand")).toBeInTheDocument();
    expect(screen.queryByText("Price")).toBeInTheDocument();
    expect(screen.queryByText("Weight")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(withMobile(<Filter isOpen={false} setIsOpen={vi.fn()} />));

    expect(screen.queryAllByText("All")).toHaveLength(0);
    expect(screen.queryByText("Reset")).not.toBeInTheDocument();
    expect(screen.queryByText("Brand")).not.toBeInTheDocument();
    expect(screen.queryByText("Price")).not.toBeInTheDocument();
    expect(screen.queryByText("Weight")).not.toBeInTheDocument();
  });

  it("it should be able to open filter", async () => {
    const mockedSetIsOpen = vi.fn();
    render(withMobile(<Filter isOpen={false} setIsOpen={mockedSetIsOpen} />));

    fireEvent.click(screen.getByText("arrow-right"));

    expect(mockedSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("it should be able to close filter", async () => {
    const mockedSetIsOpen = vi.fn();
    render(withMobile(<Filter isOpen={true} setIsOpen={mockedSetIsOpen} />));

    fireEvent.click(screen.getByText("arrow-left"));

    expect(mockedSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should be able to reset filter", () => {
    const setBrandMocked = vi.fn();
    const setCoffeeStrengthMocked = vi.fn();
    const setWeightMocked = vi.fn();
    const setSearchMocked = vi.fn();
    const setPriceLimitsMocked = vi.fn();

    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setPriceLimits: setPriceLimitsMocked,
      setBrand: setBrandMocked,
      setCoffeeStrength: setCoffeeStrengthMocked,
      setWeight: setWeightMocked,
      setSearch: setSearchMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);

    fireEvent.click(screen.getByText("Reset"));

    expect(setPriceLimitsMocked).toHaveBeenCalledWith({
      max: null,
      min: null,
    });
    expect(setBrandMocked).toHaveBeenCalledWith(null);
    expect(setCoffeeStrengthMocked).toHaveBeenCalledWith(null);
    expect(setWeightMocked).toHaveBeenCalledWith(null);
    expect(setSearchMocked).toHaveBeenCalledWith("");
  });

  it("should be able to select brand", () => {
    const setBrandMocked = vi.fn();

    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setBrand: setBrandMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);
    const brandOptions = mockedFilterValuesReturn.allProducts.edges.map(
      ({ node }) => node.brand
    );
    brandOptions.push("All");

    const brandSelect = screen.getByTestId("brand-select");

    brandOptions.forEach((option) => {
      fireEvent.change(brandSelect, { target: { value: option } });
      switch (option) {
        case "All":
          expect(setBrandMocked).toHaveBeenCalledWith(null);
          break;
        default:
          expect(setBrandMocked).toHaveBeenCalledWith(option);
          break;
      }
    });
  });

  it("should be able to select weight", () => {
    const setWeightMocked = vi.fn();

    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setWeight: setWeightMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);
    const weightOptions = mockedFilterValuesReturn.allProducts.edges.map(
      ({ node }) => String(node.weight)
    );
    weightOptions.push("All");

    const brandSelect = screen.getByTestId("weight-select");

    weightOptions.forEach((option) => {
      fireEvent.change(brandSelect, { target: { value: option } });
      switch (option) {
        case "All":
          expect(setWeightMocked).toHaveBeenCalledWith(null);
          break;
        default:
          expect(setWeightMocked).toHaveBeenCalledWith(parseFloat(option));
          break;
      }
    });
  });

  it("should be able to select coffee strength", () => {
    const setCoffeeStrengthMocked = vi.fn();

    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setCoffeeStrength: setCoffeeStrengthMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);
    const coffeeStrengthOptions = mockedFilterValuesReturn.allProducts.edges.map(
      ({ node }) => String(node.coffee_strength)
    );
    coffeeStrengthOptions.push("All");

    const brandSelect = screen.getByTestId("coffee-strength-select");

    coffeeStrengthOptions.forEach((option) => {
      fireEvent.change(brandSelect, { target: { value: option } });
      switch (option) {
        case "All":
          expect(setCoffeeStrengthMocked).toHaveBeenCalledWith(null);
          break;
        default:
          expect(setCoffeeStrengthMocked).toHaveBeenCalledWith(
            parseFloat(option)
          );
          break;
      }
    });
  });

  it("should be able to select price limits", () => {
    const setPriceLimitsMocked = vi.fn();
    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setPriceLimits: setPriceLimitsMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);

    const radioPriceInput = screen.getAllByTestId("price-radio");

    PRICE_OPTIONS.forEach(({ max, min }, index) => {
      fireEvent.click(radioPriceInput[index]);
      expect(setPriceLimitsMocked).toHaveBeenCalledWith({ max, min });
    });
  });

  it("should be able to select price max value", () => {
    const setPriceLimitsMocked = vi.fn();
    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setPriceLimits: setPriceLimitsMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);

    const maxPriceInput = screen.getByTestId("max-price-input");

    fireEvent.change(maxPriceInput, {
      target: {
        value: 10,
      },
    });

    expect(setPriceLimitsMocked).toHaveBeenCalledOnce();
  });

  it("should be able to select price min value", () => {
    const setPriceLimitsMocked = vi.fn();

    vi.mocked(useFilter).mockReturnValue({
      priceLimits: {
        min: null,
        max: null,
      },
      setPriceLimits: setPriceLimitsMocked,
    } as any);

    render(<Filter isOpen={true} setIsOpen={vi.fn()} />);

    const minPriceInput = screen.getByTestId("min-price-input");

    fireEvent.change(minPriceInput, {
      target: {
        value: 10,
      },
    });

    expect(setPriceLimitsMocked).toHaveBeenCalled();
  });
});
