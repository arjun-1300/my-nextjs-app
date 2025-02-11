"use client";

import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import React, { useState, useEffect } from "react";

function BusinessByCategory({ params }) {
  const resolvedParams = React.use(params); // Unwrap the params promise
  const [businessList, setBusinessList] = useState([]);

  const category = resolvedParams.category; // Safely access the category

  useEffect(() => {
    if (category) {
      getBusinessList();
    }
  }, [category]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(category)
      .then((resp) => {
        setBusinessList(resp?.businessLists || []);
      })
      .catch((err) => console.error("Error fetching business list:", err));
  };

  return (
    <div>
      <BusinessList title={category} businessList={businessList} />
    </div>
  );
}

export default BusinessByCategory;
