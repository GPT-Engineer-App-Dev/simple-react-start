import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Dishes // table: dishes
    id: number
    created_at: string
    name: string
    country: string
    size: string
    type: string
    price: number

Drinks // table: drinks
    id: number
    created_at: string
    name: string
    percentage: number
    country: string

*/

export const useDishes = () => useQuery({
    queryKey: ['dishes'],
    queryFn: () => fromSupabase(supabase.from('dishes').select('*')),
});

export const useAddDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDish) => fromSupabase(supabase.from('dishes').insert([newDish])),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

export const useUpdateDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDish) => fromSupabase(supabase.from('dishes').update(updatedDish).eq('id', updatedDish.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

export const useDeleteDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('dishes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

// Insert popular American dishes directly into the Supabase client
const insertPopularAmericanDishes = async () => {
    const dishes = [
        { name: 'Hamburger', country: 'USA', size: 'Medium', type: 'Main Course', price: 8.00 },
        { name: 'Hot Dog', country: 'USA', size: 'Small', type: 'Main Course', price: 5.00 },
        { name: 'Mac and Cheese', country: 'USA', size: 'Medium', type: 'Main Course', price: 7.00 },
        { name: 'Buffalo Wings', country: 'USA', size: 'Small', type: 'Appetizer', price: 6.00 },
        { name: 'Clam Chowder', country: 'USA', size: 'Small', type: 'Soup', price: 9.00 },
        { name: 'BBQ Ribs', country: 'USA', size: 'Large', type: 'Main Course', price: 15.00 },
        { name: 'Apple Pie', country: 'USA', size: 'Medium', type: 'Dessert', price: 4.50 },
        { name: 'Cheesecake', country: 'USA', size: 'Medium', type: 'Dessert', price: 5.00 },
        { name: 'Fried Chicken', country: 'USA', size: 'Medium', type: 'Main Course', price: 10.00 },
        { name: 'Pancakes', country: 'USA', size: 'Medium', type: 'Breakfast', price: 6.50 },
    ];

    for (const dish of dishes) {
        await fromSupabase(supabase.from('dishes').insert([dish]));
    }
};

// Call the function to insert the dishes
insertPopularAmericanDishes().catch(console.error);