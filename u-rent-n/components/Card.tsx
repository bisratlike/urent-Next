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
  onAddToCart?: () => void;
}

export function ThreeDCardDemo({ picture, price, productName, description,onAddToCart }: ThreeDCardDemoProps) {
  return (
    <CardContainer className="inter-var mb-5">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border ">
        <img
          src={picture}
          alt={productName}
          width={500}
          height={300}
          className="rounded-xl w-full object-cover"
        />
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mt-4">
          {productName}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {description}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {price}
        </CardItem>
        <CardItem 
          as="button" 
          translateZ="70" 
          className="..."
          onClick={onAddToCart}
        >
          Add to Cart
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
