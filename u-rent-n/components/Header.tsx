import React from 'react';
import Link from 'next/link';
import { Text, Group, Anchor } from '@mantine/core';

interface HeaderProps {
  title: string;
  navLinks?: { href: string; label: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, navLinks }) => {
  return (
    <div
      style={{
        backgroundColor: '#6c5ce7',
        padding: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text c="white" fw={700} size="xl">
        {title}
      </Text>

      <Group spacing="md">
        {navLinks &&
          navLinks.map((link) => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              c="white"
              fw={500}
              style={{ textDecoration: 'none' }}
            >
              {link.label}
            </Anchor>
          ))}
      </Group>
    </div>
  );
};

export default Header;