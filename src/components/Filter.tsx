import { ArrowLeft, ArrowRight } from "phosphor-react";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useGetFilterValuesQuery } from "../graphql/generated/graphql";
import { useFilter } from "../hooks";
import Image from "next/image";

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (p: boolean) => void;
}

type FilterOptions = {
  brands: string[];
  weights: string[];
  coffeeStrengths: string[];
};

const PRICE_OPTIONS = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 200 },
  { min: 200, max: null },
];

export function Filter({ isOpen, setIsOpen }: FilterProps) {
  const { data } = useGetFilterValuesQuery();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>();
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const {
    priceLimits,
    brand,
    coffeeStrength,
    weight,
    setPriceLimits,
    setBrand,
    setCoffeeStrength,
    setWeight,
    setSearch,
  } = useFilter();

  const handleFilterValues = () => {
    const handleCreateFilterOption = (
      paramName: "brand" | "weight" | "coffee_strength"
    ) => [
      ...new Set(
        data?.allProducts?.edges
          ?.filter((edge) => !!edge?.node[paramName])
          .map((edge) => String(edge?.node[paramName])) ?? []
      ),
    ];
    const newFilterOptions: FilterOptions = {
      brands: handleCreateFilterOption("brand"),
      weights: handleCreateFilterOption("weight"),
      coffeeStrengths: handleCreateFilterOption("coffee_strength"),
    };

    newFilterOptions.brands.unshift("All");
    newFilterOptions.weights.unshift("All");
    newFilterOptions.coffeeStrengths.unshift("All");

    setFilterOptions(newFilterOptions);
  };

  const handleResetFilter = () => {
    setPriceLimits({
      max: null,
      min: null,
    });
    setBrand(null);
    setCoffeeStrength(null);
    setWeight(null);
    setSelectedPrice(null);
    setSearch("");
  };

  useEffect(() => {
    handleFilterValues();
  }, [data]);

  return (
    <aside
      className={classNames(
        "absolute z-10 md:static flex flex-col gap-3 bg-dark px-8 py-6 text-white min-h-[calc(100vh-3.5rem)] shadow-md",
        {
          "p-2": isMobile && !isOpen,
        }
      )}
    >
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center bg-brown-500 w-8 h-8 absolute top-[50%] right-[-1rem] rounded-full"
        >
          {isOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
      )}

      {(!isMobile || isOpen) && (
        <>
          <div className="flex item-center justify-between">
            <span className="font-title text-lg">Filter</span>
            <button
              onClick={() => handleResetFilter()}
              className="border border-white px-2 py-1 rounded-md hover:bg-white hover:text-dark transition-colors "
            >
              Reset
            </button>
          </div>
          <Image width={192} height={28} src="/separator.png" alt="separator" />
          <div className="flex flex-col gap-2">
            <h3>Brand</h3>
            <select
              value={brand === null ? "All" : brand}
              onChange={(e) =>
                setBrand(e.target.value === "All" ? null : e.target.value)
              }
              className="p-1 bg-brown-500 rounded-sm text-white"
            >
              {filterOptions?.brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h3>Price</h3>
            <div className="flex items-center justify-between">
              <input
                value={priceLimits.min ?? ""}
                onChange={(e) =>
                  setPriceLimits((prev) => ({
                    ...prev,
                    min: parseInt(e.target.value),
                  }))
                }
                className="text-dark text-center p-1 w-16 rounded-sm"
                type="number"
              />
              <span>-</span>
              <input
                value={priceLimits.max ?? ""}
                onChange={(e) =>
                  setPriceLimits((prev) => ({
                    ...prev,
                    max: parseInt(e.target.value),
                  }))
                }
                className="text-dark text-center p-1 w-16 rounded-sm"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-1">
              {PRICE_OPTIONS.map(({ min, max }, index) => (
                <label key={min} className="flex items-center gap-2">
                  {!max ? `More then ${min}` : `${min} - ${max}`}
                  <input
                    checked={selectedPrice === index}
                    onChange={() => {
                      setPriceLimits({ min, max });
                      setSelectedPrice(index);
                    }}
                    className="accent-brown-500"
                    type="radio"
                    name="price"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3>Weight</h3>
            <select
              value={weight === null ? "All" : weight}
              onChange={(e) =>
                setWeight(
                  e.target.value === "All" ? null : parseFloat(e.target.value)
                )
              }
              className="p-1 bg-brown-500 rounded-sm text-white"
            >
              {filterOptions?.weights.map((weights) => (
                <option key={weights} value={weights}>
                  {weights}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h3>Coffee Strength</h3>
            <select
              value={coffeeStrength === null ? "All" : coffeeStrength}
              onChange={(e) =>
                setCoffeeStrength(
                  e.target.value === "All" ? null : parseFloat(e.target.value)
                )
              }
              className="p-1 bg-brown-500 rounded-sm text-white"
            >
              {filterOptions?.coffeeStrengths.map((coffeeStrength) => (
                <option key={coffeeStrength} value={coffeeStrength}>
                  {coffeeStrength}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </aside>
  );
}
