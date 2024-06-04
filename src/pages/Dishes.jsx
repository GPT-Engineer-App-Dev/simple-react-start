import { useState, useEffect } from "react";
import { useDishes, useAddDish, useUpdateDish, useDeleteDish } from "../integrations/supabase/index.js";
import { Box, Button, Input, Table, Tbody, Td, Th, Thead, Tr, VStack, HStack, Text } from "@chakra-ui/react";

const Dishes = () => {
  const { data: dishes, isLoading, isError } = useDishes();
  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();

  const [newDish, setNewDish] = useState({ name: "", country: "", size: "", type: "", price: "" });
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    const popularAmericanDishes = [
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

    popularAmericanDishes.forEach(dish => {
      addDish.mutate(dish);
    });
  }, [addDish]);

  const handleAddDish = () => {
    addDish.mutate(newDish);
    setNewDish({ name: "", country: "", size: "", type: "", price: "" });
  };

  const handleUpdateDish = (dish) => {
    updateDish.mutate(dish);
    setEditingDish(null);
  };

  const handleDeleteDish = (id) => {
    deleteDish.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading dishes</Text>;

  return (
    <VStack spacing={4}>
      <Box>
        <HStack>
          <Input
            placeholder="Name"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          />
          <Input
            placeholder="Country"
            value={newDish.country}
            onChange={(e) => setNewDish({ ...newDish, country: e.target.value })}
          />
          <Input
            placeholder="Size"
            value={newDish.size}
            onChange={(e) => setNewDish({ ...newDish, size: e.target.value })}
          />
          <Input
            placeholder="Type"
            value={newDish.type}
            onChange={(e) => setNewDish({ ...newDish, type: e.target.value })}
          />
          <Input
            placeholder="Price"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          />
          <Button onClick={handleAddDish}>Add Dish</Button>
        </HStack>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Country</Th>
            <Th>Size</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dishes.map((dish) => (
            <Tr key={dish.id}>
              <Td>
                {editingDish?.id === dish.id ? (
                  <Input
                    value={editingDish.name}
                    onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  />
                ) : (
                  dish.name
                )}
              </Td>
              <Td>
                {editingDish?.id === dish.id ? (
                  <Input
                    value={editingDish.country}
                    onChange={(e) => setEditingDish({ ...editingDish, country: e.target.value })}
                  />
                ) : (
                  dish.country
                )}
              </Td>
              <Td>
                {editingDish?.id === dish.id ? (
                  <Input
                    value={editingDish.size}
                    onChange={(e) => setEditingDish({ ...editingDish, size: e.target.value })}
                  />
                ) : (
                  dish.size
                )}
              </Td>
              <Td>
                {editingDish?.id === dish.id ? (
                  <Input
                    value={editingDish.type}
                    onChange={(e) => setEditingDish({ ...editingDish, type: e.target.value })}
                  />
                ) : (
                  dish.type
                )}
              </Td>
              <Td>
                {editingDish?.id === dish.id ? (
                  <Input
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({ ...editingDish, price: e.target.value })}
                  />
                ) : (
                  dish.price
                )}
              </Td>
              <Td>
                {editingDish?.id === dish.id ? (
                  <Button onClick={() => handleUpdateDish(editingDish)}>Save</Button>
                ) : (
                  <Button onClick={() => setEditingDish(dish)}>Edit</Button>
                )}
                <Button onClick={() => handleDeleteDish(dish.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default Dishes;