"use client";
import React from 'react';
import { useForm } from '@mantine/hooks';
import { TextInput, Textarea, NumberInput, Button, Container, Title, FileInput } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';

const AddProductPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            price: 0,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        if (!image) {
            console.error('Image is required');
            return;
        }

        
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'your_upload_preset'); 

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dwlskeflt/image/upload', formData);
            const imageUrl = response.data.secure_url;

            
            const productData = {
                ...values,
                picture: imageUrl,
            };

            console.log('Product added:', productData);
            
        } catch (error) {
            console.error('Error uploading image:', error);
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