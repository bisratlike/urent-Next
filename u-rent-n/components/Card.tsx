"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

interface ThreeDCardDemoProps {
  picture: string;
  price: number;
  productName: string;
  description: string;
}

export function ThreeDCardDemo({ picture, price, productName, description }: ThreeDCardDemoProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <Image  src={picture || "/codes.jpg"} alt={productName} width={300} height={200} className="rounded-xl" />
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
        >
          {productName}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {price}
        </CardItem>
        <CardItem
          as="button"
          translateZ="70"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}