/* eslint-disable react/no-unescaped-entities */
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function sSearch({ fromList, destination, checkin, checkout }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState({
    destination: destination || "Dhaka",
    checkin: checkin,
    checkout: checkout,
  });

  const [allowSearch, setAllowSearch] = useState(true);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const state = {
      ...searchTerm,
      [name]: value,
    };
    if (
      new Date(state.checkin).getTime() > new Date(state.checkout).getTime()
    ) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }
    setSearchTerm(state);
  };

  const doSearch = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("destination", searchTerm?.destination);

    if (searchTerm?.checkin && searchTerm?.checkout) {
      params.set("checkin", searchTerm?.checkin);
      params.set("checkout", searchTerm?.checkout);
    }

    if (pathname.includes("hotels")) {
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}hotels?${params.toString()}`);
    }
  };

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                onChange={handleInputs}
                defaultValue={searchTerm?.destination}
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Cox">Cox's Bazar</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Saint">Saint Martin</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                onChange={handleInputs}
                value={searchTerm?.checkin}
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                onChange={handleInputs}
                value={searchTerm?.checkout}
              />
            </h4>
          </div>
        </div>
      </div>
      <button disabled={!allowSearch} onClick={doSearch} className="search-btn">
        🔍️ {fromList ? "Modify search" : "Search"}
      </button>
    </>
  );
}
