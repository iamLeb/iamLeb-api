const Service = require('../helpers/Service');

// Function to fetch users and their associated collection items grouped by userId
const getUser = async (Service, UserModel, CollectionModel) => {
    try {
        const service = new Service();

        // Get all items from the collection with their associated user information
        const items = await service.get(CollectionModel);

        // Object to store combined user and collection data grouped by userId
        const userCollectionsMap = {};

        // Iterate through each item and group by userId
        for (const item of items) {
            if (!userCollectionsMap[item.userId]) {
                // Fetch user information for the userId
                const user = await service.getOne(UserModel, item.userId);

                // Initialize collections array for the userId
                userCollectionsMap[item.userId] = {
                    user: {
                        userId: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                        // Add more fields as needed
                    },
                    collections: []
                };
            }

            // Add the collection item to the collections array
            userCollectionsMap[item.userId].collections.push({
                itemId: item._id, // Assuming item has an _id field
                collectionData: item // Rename collection to something specific if needed
            });
        }

        // Convert the map object to an array of values (userCollections)
        const userCollections = Object.values(userCollectionsMap);

        // Return the combined data
        return userCollections;
    } catch (e) {
        throw new Error(`Error fetching user data with collections: ${e.message}`);
    }
};

module.exports = {
    getUser
};
