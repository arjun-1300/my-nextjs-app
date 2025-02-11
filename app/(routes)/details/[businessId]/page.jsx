"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import SuggesstedBusinessList from "../_components/SuggesstedBusinessList";
import BusinessDescription from "../_components/BusinessDescription";

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    // Unwrapping the params using useEffect
    params.then((resolved) => {
      setResolvedParams(resolved);
    });
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      getBusinessById(resolvedParams.businessId);
    }
  }, [resolvedParams]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getBusinessById = (businessId) => {
    GlobalApi.getBusinessById(businessId).then((resp) => {
      setBusiness(resp.businessList);
    });
  };

  const checkUserAuth = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
      signIn("descope");
    }
  };

  return status === "authenticated"&&business&&
  <div className="py-8 md:py-20 px-10 md:px-36">
      <BusinessInfo business={business} />

      <div className="grid grid-cols-3 mt-16">
        <div className="col-span-3 md:col-span-2 order-last md:order-first">
        <BusinessDescription business={business}/>
        </div>
        <div className="">
          <SuggesstedBusinessList business={business}/>
        </div>
      </div>

  </div>;
}

export default BusinessDetail;
