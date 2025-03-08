"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Button } from "@mantine/core";

interface ThreeDCardDemoProps {
  picture: string;
  price: number;
  productName: string;
  description: string;
  onAddToCart?: () => void;
}

export function ThreeDCardDemo({ picture, price, productName, description, onAddToCart }: ThreeDCardDemoProps) {
  return (
    <CardContainer className="inter-var mb-5 w-full max-w-[350px] h-full floating-card">
      <CardBody className="bg-white relative group/card hover:shadow-xl transition-shadow duration-300 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col hover-tilt">
        {/* Glowing border effect */}
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
        </div>

        {/* Image container with hover zoom */}
        <div className="relative h-60 w-full overflow-hidden rounded-xl mb-4 group">
          <Image
            src={picture}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content section */}
        <div className="flex flex-col flex-1">
          <CardItem translateZ="50" className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {productName}
          </CardItem>
          
          <CardItem 
            as="p" 
            translateZ="60" 
            className="text-gray-600 text-sm dark:text-neutral-300 line-clamp-3 mb-4 flex-1"
          >
            {description}
          </CardItem>

          <div className="flex items-center justify-between mt-auto">
            <CardItem 
              as="p" 
              translateZ="60" 
              className="text-lg font-semibold text-blue-600 dark:text-cyan-400"
            >
              ${price.toFixed(2)}
            </CardItem>
            
            <CardItem translateZ="70">
              <Button
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                size="sm"
                onClick={onAddToCart}
                className="hover:scale-105 transition-transform shadow-md hover:shadow-lg"
              >
                Add to Cart
              </Button>
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}