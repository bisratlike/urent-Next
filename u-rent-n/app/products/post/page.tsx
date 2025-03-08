"use client";
import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, NumberInput, Button, Container, Title, FileInput, LoadingOverlay, Box } from '@mantine/core';
import { useState } from 'react';
import { uploadImage } from '@/lib/actions/ImageHandler';
import { createProduct } from '@/lib/actions/product';
import { IconUpload, IconPhoto, IconCurrencyDollar, IconTextCaption, IconDescription } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Notifications, showNotification } from '@mantine/notifications';
import { motion } from 'framer-motion';

const AddProductPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            price: 0,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
            price: (value) => (value <= 0 ? 'Price must be greater than 0' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        if (!image) {
            showNotification({
                title: 'Missing Image',
                message: 'Please select a product image',
                color: 'red',
            });
            return;
        }

        setLoading(true);
        try {
            const imageUrl = await uploadImage(image);
            await createProduct({
                ...values,
                picture: imageUrl || "/codes.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            showNotification({
                title: 'Success!',
                message: 'Product added successfully',
                color: 'teal',
            });

            setTimeout(() => router.push('/manage'), 1500);
        } catch (error) {
            console.error('Error:', error);
            showNotification({
                title: 'Error',
                message: 'Failed to create product',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Container size="md" className="min-h-screen py-12">
                <Notifications position="top-right" />
                <Box className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-xl border border-gray-100">
                    <LoadingOverlay visible={loading} overlayBlur={2} />

                    <Title order={1} className="text-center mb-8">
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Add New Product
                        </span>
                    </Title>

                    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput
                                label="Product Name"
                                placeholder="Enter product name"
                                {...form.getInputProps('name')}
                                icon={<IconTextCaption size={20} className="text-blue-500" />}
                                size="md"
                                classNames={{
                                    input: "rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                                    label: "text-gray-700 font-medium mb-1",
                                }}
                            />

                            <NumberInput
                                label="Price"
                                placeholder="Enter product price"
                                {...form.getInputProps('price')}
                                icon={<IconCurrencyDollar size={20} className="text-blue-500" />}
                                min={0}
                                step={0.01}
                                size="md"
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                formatter={(value) =>
                                    !Number.isNaN(parseFloat(value))
                                        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        : '$ '
                                }
                                classNames={{
                                    input: "rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                                    label: "text-gray-700 font-medium mb-1",
                                }}
                            />
                        </div>

                        <Textarea
                            label="Description"
                            placeholder="Enter product description"
                            {...form.getInputProps('description')}
                            icon={<IconDescription size={20} className="text-blue-500" />}
                            minRows={4}
                            size="md"
                            classNames={{
                                input: "rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                                label: "text-gray-700 font-medium mb-1",
                            }}
                        />

                        <FileInput
                            label="Product Image"
                            placeholder="Upload product image"
                            onChange={setImage}
                            icon={<IconPhoto size={20} className="text-blue-500" />}
                            accept="image/png,image/jpeg,image/webp"
                            clearable
                            size="md"
                            classNames={{
                                input: "rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                                label: "text-gray-700 font-medium mb-1",
                            }}
                            valueComponent={({ value }) => (
                                <div className="flex items-center mt-1">
                                    <IconUpload size={16} className="text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">{value?.name}</span>
                                </div>
                            )}
                        />

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                className="mt-6"
                                variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan' }}
                                loading={loading}
                                loaderPosition="right"
                            >
                                Create Product
                            </Button>
                        </motion.div>
                    </form>
                </Box>
            </Container>
        </motion.div>
    );
};

export default AddProductPage;