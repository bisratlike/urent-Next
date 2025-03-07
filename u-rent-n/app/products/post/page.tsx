"use client";
import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, NumberInput, Button, Container, Title, FileInput } from '@mantine/core';
import { useState } from 'react';
import { uploadImage } from '@/lib/actions/ImageHandler';
import {createProduct} from '@/lib/actions/product';
// import { Product } from '@/lib/actions/types';
const AddProductPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            price: 0,
        },
    });
// app/products/post/page.tsx
const handleSubmit = async (values: typeof form.values) => {
    if (!image) return;
  
    try {
      
      const imageUrl = await uploadImage(image);
      
      const productData = {
        ...values,
        picture: imageUrl || "/codes.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      await createProduct(productData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return (
        <Container className="mt-10 p-6 bg-white rounded-lg shadow-md">
            <Title order={2} className="mb-6 text-center">
                Add New Product
            </Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Product Name"
                    placeholder="Enter product name"
                    {...form.getInputProps('name')}
                    className="mb-4"
                />
                <Textarea
                    label="Description"
                    placeholder="Enter product description"
                    {...form.getInputProps('description')}
                    className="mb-4"
                />
                <NumberInput
  label="Price"
  placeholder="Enter product price"
  {...form.getInputProps('price')}
  className="mb-4"
  min={0}
  step={0.01}
/>
                <FileInput
                    label="Product Image"
                    placeholder="Upload product image"
                    onChange={setImage}
                    className="mb-4"
                />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                    Add Product
                </Button>
            </form>
        </Container>
    );
};

export default AddProductPage;