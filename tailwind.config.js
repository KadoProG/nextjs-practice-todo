/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // border
        border: '#ddd',
        'border-dark': '#495057',

        // text
        text: '#000',
        'text-secondary': '#666',
        'text-dark': '#DDD',
        'text-secondary-dark': '#aaa',

        // background
        'bg-base': '#FFF',
        'bg-base-hover': '#F5F5F5',
        'bg-base-dark': '#17191C',
        'bg-base-hover-dark': '#212326',

        'bg-second': '#F5F5F5',
        'bg-second-hover': '#eee',
        'bg-second-dark': '#444',
        'bg-second-hover-dark': '#555',

        'bg-active': '#96E3AE',
        'bg-active-hover': '#7DC393',
        'bg-active-dark': '#2F6843',
        'bg-active-hover-dark': '#26573A',

        'bg-info': '#17a2b8',
        'bg-info-dark': '#2e7887',

        'bg-success': '#63cd32',
        'bg-success-dark': '#198766',

        'bg-warning': '#ffc107',
        'bg-warning-dark': '#947a2c',

        'bg-error': '#ffe6e6',
        'bg-error-hover': '#f5a0a0',
        'bg-error-dark': '#6e3333',
        'bg-error-hover-dark': '#824040',
      },
      backgroundImage: {
        // スケルトンに使うグラデーション
        'skeleton-gradient': 'linear-gradient(-90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        'skeleton-gradient-dark': 'linear-gradient(-90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%)',
      },
      keyframes: {
        'skeleton-loading': {
          '0%': { 'background-position': '200% 0' },
          '100%': { 'background-position': '-200% 0' },
        },
        'snackbar-message': {
          '0%': { transform: 'translateY(-120%)' },
          '5%': { transform: 'translateY(0)' },
          '95%': { transform: 'translateY(0)', position: 'initial' },
          '100%': {
            transform: 'translateY(-120%)',
            position: 'absolute',
            bottom: 0,
            display: 'none',
          },
        },
      },
      animation: {
        'skeleton-loading': 'skeleton-loading 2s infinite',
        'snackbar-message': 'snackbar-message 7s forwards',
      },
    },
  },
};
